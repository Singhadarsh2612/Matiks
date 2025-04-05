import React from 'react'
import "../pages/Practice.css";
const DigitDisplay = ({ digits }) => {
  return (
    <div className="digits-container">
      {digits.map((digit, index) => (
        <div key={index} className="digit">
          {digit}
        </div>
      ))}
    </div>
  )
}

export default DigitDisplay