import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// You may want to centralize your socket connection in a separate file.
const socket = io("http://localhost:5000");

const Game = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { gameId } = location.state || {}; // gameId passed from the lobby
  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!gameId) {
      // If no gameId is found, return to lobby.
      navigate("/");
    }

    // Listen for the gameOver event
    socket.on("gameOver", ({ winner }) => {
      setWinner(winner);
    });

    return () => {
      socket.off("gameOver");
    };
  }, [userInfo, navigate, gameId]);

  // When a player clicks the button, emit the playerClick event
  const handleClick = () => {
    socket.emit("playerClick", { gameId, username: userInfo.name });
  };

  return (
    <div className="container text-center">
      <h2>Game On!</h2>
      {winner ? (
        <h1>{winner === userInfo.name ? "WIN" : `${winner} wins!`}</h1>
      ) : (
        <button className="btn btn-warning" onClick={handleClick}>
          Click Me!
        </button>
      )}
    </div>
  );
};

export default Game;
