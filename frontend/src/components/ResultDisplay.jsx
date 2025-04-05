import React from 'react'
import "../pages/Practice.css";
const ResultDisplay = ({ correct, message }) => {
  return (
    <div className={`result ${correct ? 'correct' : 'incorrect'}`}>
      {message}
    </div>
  )
}

export default ResultDisplay
