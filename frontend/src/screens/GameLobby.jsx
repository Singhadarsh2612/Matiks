import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5001"); // Your backend URL

const GameLobby = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [gameId, setGameId] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState("");
  const [mathProblem, setMathProblem] = useState(""); // math question
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    // Reconnect user
    socket.emit("reconnectUser", userInfo.name);

    socket.on("gameCreated", ({ gameId, players }) => {
      setGameId(gameId);
      setPlayers(players);
    });

    socket.on("gameJoined", ({ gameId, players }) => {
      setGameId(gameId);
      setPlayers(players);
    });

    // When two players join, the server sends a math problem via startGame
    socket.on("startGame", ({ message, mathProblem }) => {
      setGameStarted(true);
      setMathProblem(mathProblem);
      console.log(message);
    });

    // Listen for game over event
    socket.on("gameOver", ({ winner }) => {
      setWinner(winner);
    });

    socket.on("errorMessage", (message) => {
      alert(message);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("gameJoined");
      socket.off("startGame");
      socket.off("gameOver");
      socket.off("errorMessage");
    };
  }, [userInfo, navigate]);

  // Create Game
  const createGame = () => {
    socket.emit("createGame", userInfo.name);
  };

  // Join Game
  const joinGame = () => {
    const enteredGameId = prompt("Enter Game ID:");
    if (enteredGameId) {
      socket.emit("joinGame", { gameId: enteredGameId, username: userInfo.name });
    }
  };

  // Submit the math answer
  const handleSubmit = () => {
    socket.emit("solveMath", { gameId, username: userInfo.name, answer: userAnswer });
    setUserAnswer("");
  };

  return (
    <div className="container text-center">
      <h2>Welcome, {userInfo?.name}!</h2>
      <button className="btn btn-primary m-2" onClick={createGame}>
        Create Game
      </button>
      <button className="btn btn-success m-2" onClick={joinGame}>
        Join Game
      </button>

      {gameId && <h3 className="mt-3">Game ID: {gameId}</h3>}

      <h3>Players:</h3>
      <ul className="list-group">
        {players.map((player, index) => (
          <li key={index} className="list-group-item">
            {player.username}
          </li>
        ))}
      </ul>

      {/* Display the math problem when the game starts */}
      {gameStarted && (
        <div className="mt-4">
          <h2>Math Problem:</h2>
          <h3>{mathProblem}</h3>
          {winner ? (
            <h1>{winner === userInfo.name ? "WIN" : `${winner} wins!`}</h1>
          ) : (
            <div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your Answer"
              />
              <button className="btn btn-warning ml-2" onClick={handleSubmit}>
                Submit Answer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameLobby;
