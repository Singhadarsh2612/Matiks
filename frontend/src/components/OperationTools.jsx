import React from 'react'
import "../pages/Practice.css"
const OperationTools = ({ addToExpression }) => {
  const operations = [
    { symbol: '+', display: '＋' },
    { symbol: '-', display: '－' },
    { symbol: '*', display: '×' },
    { symbol: '/', display: '÷' },
    { symbol: '^', display: '^' },
    { symbol: '(', display: '(' },
    { symbol: ')', display: ')' }
  ]

  return (
    <div className="tools">
      {operations.map((op, index) => (
        <button
          key={index}
          className="tool-btn"
          onClick={() => addToExpression(op.symbol)}
        >
          {op.display}
        </button>
      ))}
    </div>
  )
}

export default OperationTools