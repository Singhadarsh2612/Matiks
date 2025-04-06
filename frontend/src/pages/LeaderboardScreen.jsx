import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import axios from 'axios';

const LeaderboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/users/leaderboard');
        setLeaderboard(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);
  
  // Custom styles from provided code
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    fontFamily: "'Poppins', sans-serif"
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
  
  const sectionTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#00dffc",
    marginBottom: "15px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center"
  };
  
  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px"
  };
  
  const tableHeaderStyle = {
    backgroundColor: "rgba(66, 99, 235, 0.2)",
    fontWeight: "bold",
    color: "#00dffc",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "12px",
    padding: "12px 15px",
    textAlign: "center"
  };
  
  const tableRowStyle = {
    backgroundColor: "rgba(66, 99, 235, 0.1)",
    transition: "all 0.2s ease"
  };
  
  const thTdStyle = {
    padding: "12px 15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#e0e6ff"
  };
  
  const buttonStyle = {
    backgroundColor: "rgba(66, 99, 235, 0.2)",
    color: "#00dffc",
    border: "1px solid rgba(66, 99, 235, 0.4)",
    borderRadius: "10px",
    padding: "8px 20px",
    transition: "all 0.3s ease",
    fontWeight: "600"
  };
  
  const userBadgeStyle = {
    background: "rgba(0, 223, 252, 0.1)",
    color: "#00dffc",
    borderRadius: "30px",
    padding: "6px 16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(0, 223, 252, 0.3)",
    fontWeight: "700"
  };
  
  const loadingContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    color: "#00dffc"
  };
  
  const topRankStyle = {
    fontWeight: "700",
    color: "#00dffc"
  };
  
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{
          ...sectionTitleStyle,
          textAlign: "center",
          fontSize: "28px",
          marginBottom: "25px"
        }}>Leaderboard</h2>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <h4 style={{
            ...sectionTitleStyle,
            margin: 0
          }}>Top Players</h4>
          <div>
            {leaderboard.map((p, i) => p.name === userInfo?.name && (
              <div style={userBadgeStyle} key={i}>
                Your Rank: #{i + 1}
              </div>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div style={loadingContainerStyle}>
            <div className="spinner-border" role="status" style={{color: "#00dffc", marginBottom: "15px"}}>
              <span className="visually-hidden">Loading leaderboard...</span>
            </div>
            <p>Loading leaderboard...</p>
          </div>
        ) : error ? (
          <div style={{
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            borderRadius: "10px",
            padding: "15px",
            color: "#ff6384",
            border: "1px solid rgba(255, 99, 132, 0.3)"
          }}>
            Error: {error}
          </div>
        ) : (
          <div style={{overflowX: "auto"}}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Rank</th>
                  <th style={tableHeaderStyle}>Player</th>
                  <th style={tableHeaderStyle}>Wins</th>
                  <th style={tableHeaderStyle}>Win Rate</th>
                  <th style={tableHeaderStyle}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr 
                    key={index} 
                    style={{
                      ...tableRowStyle,
                      backgroundColor: player.name === userInfo?.name 
                        ? "rgba(0, 223, 252, 0.15)" 
                        : "rgba(66, 99, 235, 0.1)"
                    }}
                  >
                    <td style={{
                      ...thTdStyle,
                      fontWeight: index < 3 ? "700" : "normal"
                    }}>
                      {index + 1 <= 3 ? (
                        <span style={topRankStyle}>
                          {index + 1 === 1 ? '🥇 ' : index + 1 === 2 ? '🥈 ' : '🥉 '}
                          {index + 1}
                        </span>
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td style={thTdStyle}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(66, 99, 235, 0.3)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "10px",
                          border: "1px solid rgba(66, 99, 235, 0.4)"
                        }}>
                          {player.name.charAt(0).toUpperCase()}
                        </div>
                        {player.name}
                      </div>
                    </td>
                    <td style={thTdStyle}>{player.wins}</td>
                    <td style={thTdStyle}>{player.winRate}%</td>
                    <td style={{
                      ...thTdStyle,
                      fontWeight: "bold",
                      color: index < 3 ? "#00dffc" : "#e0e6ff"
                    }}>{player.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px"
        }}>
          <Button 
            variant="outline-primary" 
            disabled={loading}
            style={buttonStyle}
          >
            « Previous
          </Button>
          <Button 
            variant="outline-primary" 
            disabled={loading}
            style={buttonStyle}
          >
            Next »
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;