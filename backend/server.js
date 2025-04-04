import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/userModel.js'; // ✅ Import User model


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

// Socket.io Game Logic
const users = {}; // Store users with socket ID mapping
const games = {}; // Store game sessions

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("createGame", (username) => {
        const gameId = Math.random().toString(36).substr(2, 6);
        games[gameId] = { players: [{ id: socket.id, username }], gameStarted: false };
        users[socket.id] = { username, gameId };

        socket.join(gameId);
        io.to(gameId).emit("gameCreated", { gameId, players: games[gameId].players });

        console.log(`Game created: ${gameId} by ${username}`);
    });

    socket.on("joinGame", ({ gameId, username }) => {
        if (!games[gameId]) {
            socket.emit("errorMessage", "Game not found.");
            return;
        }

        if (games[gameId].players.length >= 2) {
            socket.emit("errorMessage", "Lobby is full. Cannot join.");
            return;
        }

        if (users[socket.id]?.gameId) {
            const oldGameId = users[socket.id].gameId;
            games[oldGameId].players = games[oldGameId].players.filter(player => player.id !== socket.id);

            if (games[oldGameId].players.length === 0) {
                delete games[oldGameId];
            } else {
                io.to(oldGameId).emit("gameJoined", { gameId: oldGameId, players: games[oldGameId].players });
            }

            socket.leave(oldGameId);
            console.log(`${username} left game: ${oldGameId}`);
        }

        games[gameId].players.push({ id: socket.id, username });
        users[socket.id] = { username, gameId };

        socket.join(gameId);
        io.to(gameId).emit("gameJoined", { gameId, players: games[gameId].players });

        console.log(`${username} joined game: ${gameId}`);

        // Start the game when two players are present
        if (games[gameId].players.length === 2 && !games[gameId].gameStarted) {
            games[gameId].gameStarted = true;
            const a = Math.floor(Math.random() * 10);
            const b = Math.floor(Math.random() * 10);
            const question = `${a} + ${b}`;
            const correctAnswer = a + b;
            games[gameId].mathProblem = { question, correctAnswer };
            io.to(gameId).emit("startGame", { message: "Solve the math problem", mathProblem: question });
        }
    });

    socket.on("solveMath", async ({ gameId, username, answer }) => {
        if (!games[gameId] || games[gameId].winner) return;

        if (parseInt(answer) === games[gameId].mathProblem.correctAnswer) {
            games[gameId].winner = username;
            io.to(gameId).emit("gameOver", { winner: username });

            console.log(`${username} solved the problem correctly in room: ${gameId}`);

            try {
                // ✅ Store the game result in the database
                const winner = await User.findOne({ name: username });
                const loser = await User.findOne({ name: games[gameId].players.find(p => p.username !== username)?.username });

                if (winner && loser) {
                    const gameRecordWinner = {
                        opponent: loser.name,
                        result: 'Win',
                        playedAt: new Date(),
                    };

                    const gameRecordLoser = {
                        opponent: winner.name,
                        result: 'Loss',
                        playedAt: new Date(),
                    };

                    winner.gameHistory.push(gameRecordWinner);
                    loser.gameHistory.push(gameRecordLoser);

                    await winner.save();
                    await loser.save();

                    console.log('Game history updated successfully.');
                } else {
                    console.log('❌ Could not find winner or loser in DB');
                }
            } catch (error) {
                console.error('❌ Error updating game history:', error);
            }
        }
    });

    socket.on("reconnectUser", (username) => {
        for (const id in users) {
            if (users[id].username === username) {
                users[socket.id] = users[id];
                delete users[id];

                if (users[socket.id] && users[socket.id].gameId) {
                    const gameId = users[socket.id].gameId;
                    socket.join(gameId);
                    io.to(gameId).emit("gameJoined", { gameId, players: games[gameId].players });
                }
                console.log(`User reconnected: ${username}`);
                break;
            }
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        if (users[socket.id]) {
            const { gameId, username } = users[socket.id];

            if (games[gameId]) {
                games[gameId].players = games[gameId].players.filter(player => player.id !== socket.id);

                if (games[gameId].players.length === 0) {
                    delete games[gameId];
                } else {
                    io.to(gameId).emit("gameJoined", { gameId, players: games[gameId].players });
                }
            }
            delete users[socket.id];
        }
    });
});

// Middleware
app.use(notFound);
app.use(errorHandler);

// Start server with Socket.io
server.listen(port, () => console.log(`Server started on port ${port}`));
