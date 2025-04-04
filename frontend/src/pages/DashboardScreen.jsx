import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import GameHistory from "../screens/GameHistory";
const Dashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);
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

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center" }}>
          <img src={user.image} alt="User" style={imageStyle} />
          <div style={nameStyle}>{userInfo.name}</div>
          <div style={emailStyle}>{userInfo.email}</div>
          <div style={ratingStyle}>
            {user.rating}
            <span style={starStyle}>⭐</span>
          </div>
        </div>

        <GameHistory/>
      </div>
    </div>
  );
};

export default Dashboard;
