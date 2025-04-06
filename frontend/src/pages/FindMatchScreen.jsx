import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import sequences from "../data/sequences.json";
import "./FindMatchScreen.css";

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
        <div className="game-lobby">
          <div className="game-lobby-container">
            <h2 className="welcome-title">Welcome, {userInfo?.name}! 🎮</h2>
            
            <button className="find-pair-btn" onClick={findPair}>
              Find a Pair
            </button>
    
            {gameId && <h3 className="game-status">Game ID: {gameId}</h3>}
    
            <div className="players-list">
              <h3>Players</h3>
              {players.map((player, index) => (
                <div key={index} className="player-item">
                  {player.username}
                </div>
              ))}
            </div>
    
            {(gameStarted || pairStatus) && (
              <div className="challenge-section">
                {timerActive && (
                  <div className="timer">
                    ⏱️ {formatTime(timeLeft)}
                  </div>
                )}
    
                {pairStatus && <h3 className="game-status">{pairStatus}</h3>}
    
                {pairRoom && (
                  <div className="game-status">
                    <p>Room: {pairRoom}</p>
                    <p>Players: {pairPlayers.join(" vs ")}</p>
                  </div>
                )}
    
                {sequenceData.sequence && (
                  <div>
                    <h4>Sequence Challenge</h4>
                    <div className="sequence-display">
                      {sequenceData.sequence}
                    </div>
                    
                    <input
                      type="text"
                      className="expression-input"
                      placeholder="Enter your expression"
                      value={expression}
                      onChange={(e) => setExpression(e.target.value)}
                      disabled={!timerActive || result.show}
                    />
                    
                    <button
                      className="submit-btn"
                      onClick={submitExpression}
                      disabled={!timerActive || result.show}
                    >
                      Submit Expression
                    </button>
    
                    {attemptFeedback.show && !attemptFeedback.isCorrect && (
                      <div className="feedback error">
                        {attemptFeedback.message}
                      </div>
                    )}
    
                    {result.show && (
                      <div className="solution-reveal">
                        <p className={result.correct ? "feedback success" : "feedback error"}>
                          {result.message}
                        </p>
                        {result.solution && (
                          <div>
                            <h4>Solution</h4>
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
