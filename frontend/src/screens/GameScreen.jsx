import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5001"); // Change if needed

const GameScreen = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const { userInfo } = useSelector((state) => state.auth);

    const [players, setPlayers] = useState([]);
    const [turn, setTurn] = useState(null);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (!userInfo) navigate("/login");

        socket.emit("joinGame", { gameId, username: userInfo.name });

        socket.on("gameJoined", ({ players }) => {
            setPlayers(players);
        });

        socket.on("moveMade", ({ username, nextTurn }) => {
            setTurn(nextTurn);
        });

        socket.on("gameOver", ({ winner }) => {
            setWinner(winner);
        });

        return () => {
            socket.off("gameJoined");
            socket.off("moveMade");
            socket.off("gameOver");
        };
    }, [gameId, userInfo, navigate]);

    const makeMove = () => {
        socket.emit("makeMove", { gameId, username: userInfo.name });
    };

    return (
        <div className="game-container">
            <h2>Game: {gameId}</h2>
            <h3>Players:</h3>
            <ul>
                {players.map((p, index) => (
                    <li key={index}>{p.username}</li>
                ))}
            </ul>
            {winner ? (
                <h2>🎉 {winner} Wins! 🎉</h2>
            ) : (
                <>
                    <h3>Current Turn: {turn || "Waiting for opponent..."}</h3>
                    {turn === userInfo.name && <button onClick={makeMove}>Make Move</button>}
                </>
            )}
        </div>
    );
};

export default GameScreen;
