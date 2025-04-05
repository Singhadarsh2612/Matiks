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
  const [mathProblem, setMathProblem] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isFindingMatch, setIsFindingMatch] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    // Reconnect user
    socket.emit("reconnectUser", userInfo.name);

    socket.on("gameCreated", ({ gameId, players }) => {
      setGameId(gameId);
      setPlayers(players);
      setIsFindingMatch(false);
    });

    socket.on("gameJoined", ({ gameId, players }) => {
      setGameId(gameId);
      setPlayers(players);
      setIsFindingMatch(false);
    });

    socket.on("startGame", ({ message, mathProblem }) => {
      setGameStarted(true);
      setMathProblem(mathProblem);
      setIsFindingMatch(false);
      console.log(message);
    });

    socket.on("gameOver", ({ winner }) => {
      setWinner(winner);
    });

    // Add this new event listener for match found
    socket.on("matchFound", ({ gameId, players }) => {
      setGameId(gameId);
      setPlayers(players);
      setIsFindingMatch(false);
    });

    socket.on("errorMessage", (message) => {
      alert(message);
      setIsFindingMatch(false);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("gameJoined");
      socket.off("startGame");
      socket.off("gameOver");
      socket.off("matchFound");
      socket.off("errorMessage");
    };
  }, [userInfo, navigate]);

  const createGame = () => {
    socket.emit("createGame", userInfo.name);
  };

  const joinGame = () => {
    const enteredGameId = prompt("Enter Game ID:");
    if (enteredGameId) {
      socket.emit("joinGame", { gameId: enteredGameId, username: userInfo.name });
    }
  };

  const findMatch = () => {
    setIsFindingMatch(true);
    socket.emit("findMatch", { username: userInfo.name });
  };

  const handleSubmit = () => {
    socket.emit("solveMath", { gameId, username: userInfo.name, answer: userAnswer });
    setUserAnswer("");
  };

  return (
    <div className="container text-center">
      <h2>Welcome, {userInfo?.name}!</h2>
      
      <div className="d-flex justify-content-center flex-wrap my-3">
        <button className="btn btn-primary m-2" onClick={createGame}>
          Create Game
        </button>
        <button className="btn btn-success m-2" onClick={joinGame}>
          Join Game
        </button>
        <button 
          className="btn btn-info m-2" 
          onClick={findMatch}
          disabled={isFindingMatch}
        >
          {isFindingMatch ? "Finding Match..." : "Find a Match"}
        </button>
      </div>

      {gameId && <h3 className="mt-3">Game ID: {gameId}</h3>}

      {isFindingMatch && !gameId && (
        <div className="alert alert-info mt-3">
          Searching for an opponent... Please wait.
        </div>
      )}

      <h3>Players:</h3>
      <ul className="list-group">
        {players.map((player, index) => (
          <li key={index} className="list-group-item">
            {player.username}
          </li>
        ))}
      </ul>

      {gameStarted && (
        <div className="mt-4">
          <h2>Math Problem:</h2>
          <h3>{mathProblem}</h3>
          {winner ? (
            <h1>{winner === userInfo.name ? "You Win!" : `${winner} wins!`}</h1>
          ) : (
            <div className="mt-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your Answer"
                className="form-control d-inline-block w-auto"
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