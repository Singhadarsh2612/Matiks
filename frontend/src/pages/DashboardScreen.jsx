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

  // Modern game UI styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    fontFamily: "'Poppins', sans-serif"
  };

  const historyContainerStyle = {
    maxHeight: "300px",
    overflowY: "auto",
    marginTop: "20px",
    borderRadius: "12px",
    backgroundColor: "rgba(25, 32, 62, 0.7)",
    padding: "10px",
    boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.2)"
  };
      
  const cardStyle = {
    width: "90%",
    maxWidth: "800px",
    backgroundColor: "rgba(13, 17, 38, 0.85)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(66, 99, 235, 0.1)",
    padding: "30px",
    boxSizing: "border-box",
    color: "#fff",
    border: "1px solid rgba(66, 99, 235, 0.2)"
  };

  const profileContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    padding: "20px 0 30px 0",
    borderBottom: "1px solid rgba(66, 99, 235, 0.2)",
    marginBottom: "25px"
  };

  const profileBannerStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    height: "100px",
    background: "linear-gradient(90deg, rgba(66, 99, 235, 0.3) 0%, rgba(0, 223, 252, 0.3) 100%)",
    borderRadius: "12px 12px 50% 50%",
    zIndex: "0",
    opacity: "0.5"
  };

  const imageStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "16px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    border: "4px solid rgba(66, 99, 235, 0.5)",
    zIndex: "1"
  };

  const nameStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "4px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    zIndex: "1"
  };

  const emailStyle = {
    fontSize: "14px",
    color: "#8da9ff",
    marginBottom: "16px",
    zIndex: "1"
  };

  const ratingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "700",
    color: "#00dffc",
    background: "rgba(0, 223, 252, 0.1)",
    borderRadius: "30px",
    padding: "6px 20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    zIndex: "1",
    border: "1px solid rgba(0, 223, 252, 0.3)"
  };

  const starStyle = {
    marginLeft: "8px",
    fontSize: "20px"
  };

  const sectionTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#00dffc",
    marginBottom: "15px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center"
  };

  const iconStyle = {
    marginRight: "10px",
    fontSize: "22px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px"
  };

  const thTdStyle = {
    padding: "12px 15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#e0e6ff"
  };

  const tableHeaderStyle = {
    backgroundColor: "rgba(66, 99, 235, 0.2)",
    fontWeight: "bold",
    color: "#00dffc",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "12px"
  };

  const tableRowStyle = {
    backgroundColor: "rgba(66, 99, 235, 0.1)",
    transition: "all 0.2s ease"
  };

  const statisticsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "15px",
    marginBottom: "25px"
  };

  const statItemStyle = {
    backgroundColor: "rgba(66, 99, 235, 0.1)",
    borderRadius: "12px",
    padding: "15px 10px",
    textAlign: "center",
    border: "1px solid rgba(66, 99, 235, 0.2)"
  };

  const statValueStyle = {
    fontSize: "24px",
    fontWeight: "700",
    color: "#00dffc",
    marginBottom: "5px"
  };

  const statLabelStyle = {
    fontSize: "12px",
    color: "#8da9ff",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  const responsiveContainerStyle = {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto"
  };

  // Responsive adjustments using media queries
  const responsiveStyles = `
    @media (max-width: 768px) {
      .stats-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 480px) {
      .profile-name {
        font-size: 20px;
      }
      
      .profile-image {
        width: 100px;
        height: 100px;
      }
      
      .stat-value {
        font-size: 20px;
      }
      
      .main-card {
        padding: 20px 15px;
      }
    }
  `;

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
      <style>{responsiveStyles}</style>
      <div style={cardStyle} className="main-card">
        <div style={profileContainerStyle}>
          <div style={profileBannerStyle}></div>
          <img src={userInfo?.image || user.image} alt="User" style={imageStyle} className="profile-image" />
          <div style={nameStyle} className="profile-name">{userInfo?.name || user.name}</div>
          <div style={emailStyle}>{userInfo?.email || user.email}</div>
          <div style={ratingStyle}>
            {calculateRating()}
            <span style={starStyle}>⭐</span>
          </div>
        </div>
        
        <div style={responsiveContainerStyle}>
          <div style={sectionTitleStyle}>
            <span style={iconStyle}>📊</span> Player Statistics
          </div>
          
          <div style={statisticsContainerStyle} className="stats-container">
            <div style={statItemStyle}>
              <div style={statValueStyle} className="stat-value">{history.filter(game => game.result === "Win").length}</div>
              <div style={statLabelStyle}>Wins</div>
            </div>
            <div style={statItemStyle}>
              <div style={statValueStyle} className="stat-value">{history.filter(game => game.result === "Loss").length}</div>
              <div style={statLabelStyle}>Losses</div>
            </div>
            <div style={statItemStyle}>
              <div style={statValueStyle} className="stat-value">{history.length}</div>
              <div style={statLabelStyle}>Total Games</div>
            </div>
            <div style={statItemStyle}>
              <div style={statValueStyle} className="stat-value">
                {history.length > 0 ? Math.round((history.filter(game => game.result === "Win").length / history.length) * 100) : 0}%
              </div>
              <div style={statLabelStyle}>Win Rate</div>
            </div>
          </div>
          
          <div style={sectionTitleStyle}>
            <span style={iconStyle}>🏆</span> Recent Games
          </div>
          
          <GameHistory/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;