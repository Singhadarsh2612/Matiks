import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const containerStyle = {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1.5rem',
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    color: '#0072ff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s',
  };

  const handleWhatIsHectoc = () => {
    window.open('https://worldmentalcalculation.com/hectoc-strategies/', '_blank');
  };

  return (
    <div style={containerStyle}>
      {showLogin ? (
        <LoginScreen />
      ) : (
        <>
          <h1 style={headingStyle}>Welcome to Hectoc</h1>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={() => setShowLogin(true)}>
              Get Started
            </button>
            <button style={buttonStyle} onClick={handleWhatIsHectoc}>
              What is Hectoc?
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
