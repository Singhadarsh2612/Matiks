import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import sequences from "../data/sequences.json";
import "./GameLobby.css";

const socket = io("https://matiks-backend.onrender.com");

const GameLobby = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [gameId, setGameId] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState("");
  const [sequenceData, setSequenceData] = useState({});
  const [pairStatus, setPairStatus] = useState("");
  const [pairRoom, setPairRoom] = useState("");
  const [pairPlayers, setPairPlayers] = useState([]);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState({
    show: false,
    correct: false,
    message: "",
  });
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [attemptFeedback, setAttemptFeedback] = useState({
    show: false,
    message: "",
    isCorrect: false,
  });

  const getRandomSequence = () => {
    const sequenceKeys = Object.keys(sequences);
    const randomKey =
      sequenceKeys[Math.floor(Math.random() * sequenceKeys.length)];
    return sequences[randomKey];
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setResult({
        show: true,
        correct: false,
        message: "Time's up! No winner this round.",
        solution: sequenceData.solution, // Add solution here
      });
    }
    return () => clearInterval(interval);
  }, [timeLeft, timerActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    socket.emit("reconnectUser", userInfo.name);

    socket.on("gameCreated", ({ gameId, players }) => {
      setGameId(gameId);
      setPlayers(players);
    });

    socket.on("gameJoined", ({ gameId, players }) => {
      setGameId(gameId);
      setPlayers(players);
      // Start timer when second player joins
      if (players.length === 2) {
        setTimeLeft(300);
        setTimerActive(true);
        const randomSequence = getRandomSequence();
        setSequenceData(randomSequence);
        setGameStarted(true);
      }
    });

    socket.on("startGame", ({ sequence }) => {
      setGameStarted(true);
      setSequenceData(sequence);
      setTimeLeft(300);
      setTimerActive(true);
    });

    socket.on("gameOver", ({ winner }) => {
      setWinner(winner);
      setGameStarted(false);
      setTimerActive(false);
      const message =
        winner === userInfo.name ? "🎉 You WON!" : `${winner} won the game!`;
      setResult({ show: true, correct: true, message });
    });

    socket.on("errorMessage", (message) => {
      alert(message);
    });

    socket.on("waitingForPair", ({ message }) => {
      setPairStatus(message);
    });

    socket.on("pairFound", ({ room, players, sequence }) => {
      setPairRoom(room);
      setPairPlayers(players);
      setPairStatus("Game started!");
      setGameStarted(true);
      setSequenceData(sequence);
      setTimeLeft(300);
      setTimerActive(true);
    });

    socket.on("validSolution", ({ message }) => {
      setTimerActive(false);
      setResult({ show: true, correct: true, message });
    });

    socket.on("invalidSolution", ({ message }) => {
      setResult({ show: true, correct: false, message });
    });

    socket.on("gameResult", ({ winner, expression, solution }) => {
      setTimerActive(false);
      const message =
        winner === userInfo.name
          ? `🎉 You WON with: ${expression}`
          : `${winner} won with: ${expression}`;
      setResult({
        show: true,
        correct: true,
        message,
        solution: solution || sequenceData.solution, // Fallback to sequenceData.solution
      });
    });
    socket.on("expressionFeedback", ({ message, evaluatedResult }) => {
      setAttemptFeedback({
        show: true,
        message: `Your expression evaluated to ${evaluatedResult} instead of 100`,
        isCorrect: false,
      });
    });

    return () => {
      socket.off("gameCreated");
      socket.off("gameJoined");
      socket.off("startGame");
      socket.off("gameOver");
      socket.off("errorMessage");
      socket.off("waitingForPair");
      socket.off("pairFound");
      socket.off("invalidSolution");
      socket.off("validSolution");
      socket.off("gameResult");
      socket.off("expressionFeedback");
    };
  }, [userInfo, navigate]);

  const createGame = () => {
    socket.emit("createGame", userInfo.name);
    setTimeLeft(300);
  };

  const joinGame = () => {
    const enteredGameId = prompt("Enter Game ID:");
    if (enteredGameId) {
      socket.emit("joinGame", {
        gameId: enteredGameId,
        username: userInfo.name,
      });
    }
  };

  const findPair = () => {
    setPairStatus("Finding a pair...");
    setPairRoom("");
    setPairPlayers([]);
    socket.emit("findPair", userInfo.name);
  };

  const submitExpression = () => {
    if (expression.trim() === "") return;
    setAttemptFeedback({ show: false, message: "", isCorrect: false });
    socket.emit("submitExpression", {
      gameId: pairRoom || gameId,
      username: userInfo.name,
      expression,
    });
    // Don't clear expression here to allow editing
  };

  return (
    <div className="game-creation-lobby">
      <div className="lobby-container">
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome, {userInfo?.name}! 🎲</h2>
          <p className="welcome-subtitle">Ready to challenge your math skills?</p>
        </div>

        {!gameStarted && (
          <>
            <div className="action-buttons">
              <button className="create-game-btn" onClick={createGame}>
                Create Game Room 🎮
              </button>
              <button className="join-game-btn" onClick={joinGame}>
                Join Game Room 🎯
              </button>
            </div>

            {gameId && (
              <div className="game-info">
                <h3 className="game-id">Game ID: <span className="id-value">{gameId}</span></h3>
                <p className="share-text">Share this ID with your friend to join!</p>
              </div>
            )}
          </>
        )}

        <div className="players-section">
          <h3 className="players-title">Players in Lobby</h3>
          <div className="players-list">
            {players.map((player, index) => (
              <div key={index} className="player-card">
                <span className="player-avatar">👾</span>
                <span className="player-name">{player.username}</span>
              </div>
            ))}
          </div>
        </div>

        {(gameStarted || pairStatus) && (
          <div className="game-section">
            {timerActive && (
              <div className="timer-display">
                <span className="timer-icon">⏱️</span>
                <span className="timer-value">{formatTime(timeLeft)}</span>
              </div>
            )}

            {pairStatus && <h3 className="status-message">{pairStatus}</h3>}

            {pairRoom && (
              <div className="room-info">
                <p className="room-id">Room: {pairRoom}</p>
                <p className="room-players">Players: {pairPlayers.join(" vs ")}</p>
              </div>
            )}

            {sequenceData.sequence && (
              <div className="challenge-box">
                <h4 className="challenge-title">Sequence Challenge</h4>
                <div className="sequence-display">
                  {sequenceData.sequence}
                </div>
                
                <div className="input-section">
                  <input
                    type="text"
                    className="expression-input"
                    placeholder="Enter your mathematical expression..."
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    disabled={!timerActive || result.show}
                  />
                  
                  <button
                    className="submit-btn"
                    onClick={submitExpression}
                    disabled={!timerActive || result.show}
                  >
                    Submit Solution
                  </button>
                </div>

                {attemptFeedback.show && !attemptFeedback.isCorrect && (
                  <div className="feedback error">
                    {attemptFeedback.message}
                  </div>
                )}

                {result.show && (
                  <div className="result-display">
                    <p className={`result-message ${result.correct ? 'success' : 'error'}`}>
                      {result.message}
                    </p>
                    {result.solution && (
                      <div className="solution-box">
                        <h5 className="solution-title">Solution</h5>
                        <p className="solution-text">{result.solution}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameLobby;