import React from 'react';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="hero-section">
      <div className="hero-box">
        <div className="logo">HectoClash</div>
        <h1 className="title">The Ultimate Mental Math Duel</h1>
        <p className="subtitle">
          Challenge your friends, improve your mental math skills, and climb the global leaderboard 
          in real-time multiplayer duels. Speed and accuracy are your weapons!
        </p>
        
        <div className="cta-buttons">
          <button className="cta-button primary-button">Get Started</button>
          <button className="cta-button secondary-button">How it Works</button>
        </div>
        
        <div className="features">
          <div className="feature">
            <div className="feature-icon">🏆</div>
            <span>Live Duels</span>
          </div>
          <div className="feature">
            <div className="feature-icon">📈</div>
            <span>Skill Progress</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🌎</div>
            <span>Global Ranking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;