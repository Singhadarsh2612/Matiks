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
import cors from 'cors';
import fs from 'fs';

import { fileURLToPath } from 'url';



// Fix __dirname in ES Modules

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



// ✅ Correct path to sequences.json

const sequencesPath = path.join(__dirname, 'data', 'sequences.json');

const sequences = JSON.parse(fs.readFileSync(sequencesPath, 'utf-8'));







function getRandomSequence() {

  const keys = Object.keys(sequences);

  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  return sequences[randomKey];

}


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
app.use(cors({
    origin: 'https://hectoclash-du0twjprv-singhadarsh2612s-projects.vercel.app',
    credentials: true,
  }));
  
  
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
let waitingPair = [];
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

      

        // Start game immediately when second player joins

        if (games[gameId].players.length === 2) {

          const sequence = getRandomSequence();

          games[gameId].sequence = sequence;

          games[gameId].gameStarted = true;

          games[gameId].startTime = Date.now();

          io.to(gameId).emit("startGame", { sequence });

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

    socket.on("findPair", async (username) => {

        if (waitingPair.length > 0) {

          const waitingPlayer = waitingPair.shift();

          const pairRoom = Math.random().toString(36).substr(2, 6);

          socket.join(pairRoom);

          waitingPlayer.socket.join(pairRoom);

      

          const sequence = getRandomSequence();

          const players = [

            { id: waitingPlayer.socket.id, username: waitingPlayer.username },

            { id: socket.id, username }

          ];

      

          users[waitingPlayer.socket.id] = { username: waitingPlayer.username, gameId: pairRoom };

          users[socket.id] = { username, gameId: pairRoom };

      

          games[pairRoom] = {

            players,

            gameStarted: true,

            sequence,

            winner: null,

            startTime: Date.now()

          };

      

          io.to(pairRoom).emit("pairFound", {

            room: pairRoom,

            players: [waitingPlayer.username, username],

            sequence

          });

        } else {

          waitingPair.push({ socket, username });

          socket.emit("waitingForPair", { message: "Finding a pair, please wait..." });

        }

      });

    



      socket.on("submitExpression", async ({ gameId, expression, username }) => {
        const game = games[gameId];
        if (!game || game.winner) return;
      
        console.log(`[SUBMIT] Received expression: ${expression} from ${username} in game: ${gameId}`);
      
        try {
          // Sanitize the expression (keep existing sanitization)
          const sanitizedExpression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/[−–]/g, '-')
            .replace(/=/g, '')
            .replace(/\s+/g, '')
            .trim();
      
          // ✅ NEW: Check if digits match the sequence in order
          const extractDigits = str => str.replace(/[^\d]/g, '');
          const expressionDigits = extractDigits(sanitizedExpression);
          const sequenceDigits = extractDigits(game.sequence.sequence);
      
          if (expressionDigits !== sequenceDigits) {
            throw new Error(`Digits in expression do not match the sequence "${game.sequence.sequence}"`);
          }
      
          // Existing validation checks (keep these exactly as is)
          const openParens = (sanitizedExpression.match(/\(/g) || []).length;
          const closeParens = (sanitizedExpression.match(/\)/g) || []).length;
          
          if (openParens !== closeParens) {
            throw new Error("Unbalanced parentheses");
          }
      
          if (!/^[\d+\-*/().]+$/.test(sanitizedExpression)) {
            throw new Error("Invalid characters in expression");
          }
      
          // Evaluation (keep existing eval)
          const result = eval(sanitizedExpression);
          console.log(`[EVAL] Result: ${result}`);
      
          if (result === 100) {
            game.winner = username;
            game.endTime = Date.now();
      
            // Keep existing game history update code exactly as is
            try {
              const winner = await User.findOne({ name: username });
              const otherPlayer = game.players.find(p => p.username !== username);
              const loser = otherPlayer ? await User.findOne({ name: otherPlayer.username }) : null;
      
              if (winner) {
                winner.gameHistory.push({
                  opponent: loser ? loser.name : "Unknown",
                  result: 'Win',
                  sequence: game.sequence.sequence,
                  expressionUsed: expression,
                  date: new Date(),
                  gameDuration: (game.endTime - game.startTime) / 1000 + ' seconds'
                });
                await winner.save();
              }
      
              if (loser) {
                loser.gameHistory.push({
                  opponent: username,
                  result: 'Loss',
                  sequence: game.sequence.sequence,
                  expressionUsed: '',
                  date: new Date(),
                  gameDuration: (game.endTime - game.startTime) / 1000 + ' seconds'
                });
                await loser.save();
              }
      
              console.log('✅ Game history updated for both players');
            } catch (err) {
              console.error('❌ Error updating game history:', err);
            }
      
            // Modified emit to include solution
            io.to(gameId).emit("gameResult", { 
              winner: username, 
              expression,
              solution: game.sequence.solution, // Add solution here
              message: `${username} solved it first with: ${expression}`
            });
          } else {
            // Modified to use expressionFeedback instead of invalidSolution
            socket.emit("expressionFeedback", {
              correct: false,
              evaluatedResult: result,
              message: `Incorrect! Evaluated to ${result}. Try again!`,
              attemptsLeft: true
            });
          }
        } catch (err) {
          console.error("[ERROR] Invalid expression:", err.message);
          // Modified to use expressionFeedback
          socket.emit("expressionFeedback", {
            correct: false,
            message: `Invalid expression: ${err.message}`,
            attemptsLeft: true
          });
        }
      });


    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        // Remove from waitingPair if they were waiting for a stranger
    waitingPair = waitingPair.filter(item => item.socket.id !== socket.id);
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
