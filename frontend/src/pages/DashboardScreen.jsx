import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import GameHistory from "../screens/GameHistory";
const Dashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { history } = useSelector((state) => state.gameHistory);

  const user = {
    name: "Adarsh Kumar Singh",
    email: "adarsh@example.com",
    rating: 4.8,
    image: "https://random-image-pepebigotes.vercel.app/api/random-image"
  };

  const gameHistory = [
    { opponent: "John Doe", result: "Win", date: "2025-04-01" },
    { opponent: "Alice Smith", result: "Loss", date: "2025-04-02" },
    { opponent: "Bob Johnson", result: "Win", date: "2025-04-03" }
  ];

  const containerStyle = {
    height: "100vh",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5"
  };

  const cardStyle = {
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    padding: "24px",
    boxSizing: "border-box"
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  };

  const nameStyle = {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "4px"
  };

  const emailStyle = {
    fontSize: "14px",
    color: "#777",
    marginBottom: "12px"
  };

  const ratingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "500",
    color: "#f39c12",
    marginBottom: "20px"
  };

  const starStyle = {
    marginLeft: "6px",
    fontSize: "18px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse"
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    fontSize: "14px"
  };

  const tableHeaderStyle = {
    backgroundColor: "#f7f7f7",
    fontWeight: "bold"
  };
  const calculateRating = () => {
    if (!userInfo || history.length === 0) return 500; // default base
  
    let played = 0;
    let wins = 0;
    let losses = 0;
  
    history.forEach((game) => {
      if (!game || !game.result || !game.opponent) return;
  
      // The current user is the one viewing the dashboard
      played++;
  
      if (game.result === "Win") wins++;
      else if (game.result === "Loss") losses++;
    });
  
    // You can adjust this formula however you like
    const rating = 500 + wins * 30 - losses * 10 + played * 2;
  
    return Math.max(0, Math.round(rating)); // No negative ratings
  };
  
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center" }}>
          <img src={user.image} alt="User" style={imageStyle} />
          <div style={nameStyle}>{userInfo.name}</div>
          <div style={emailStyle}>{userInfo.email}</div>
          <div style={ratingStyle}>
            {calculateRating()}
            <span style={starStyle}>⭐</span>
          </div>
        </div>

        <GameHistory/>
      </div>
    </div>
  );
};

export default Dashboard;
