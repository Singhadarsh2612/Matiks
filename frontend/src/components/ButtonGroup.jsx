import React from 'react'

const ButtonGroup = ({ onNewGame, onGiveUp, showSolution }) => {
  return (
    <div className="buttons-container">
      <button className="new-game-btn" onClick={onNewGame}>
        New Game
      </button>
      
      {!showSolution && (
        <button className="give-up-btn" onClick={onGiveUp}>
          Give Up
        </button>
      )}
    </div>
  )
}

export default ButtonGroup