import React from 'react'
import OperationTools from './OperationTools'
import "../pages/Practice.css";
const ExpressionInput = ({ expression, setExpression, checkSolution }) => {
  const handleInputChange = (e) => {
    setExpression(e.target.value)
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkSolution()
    }
  }
  
  const addToExpression = (char) => {
    setExpression(prev => prev + char)
  }

  return (
    <div className="input-container">
      <div className="hint">Enter your expression below. Use all digits in order to equal 100.</div>
      <input
        type="text"
        className="expression-input"
        value={expression}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your solution..."
      />
      
      <OperationTools addToExpression={addToExpression} />
      
      <button className="check-btn" onClick={checkSolution}>
        Check Solution
      </button>
    </div>
  )
}

export default ExpressionInput