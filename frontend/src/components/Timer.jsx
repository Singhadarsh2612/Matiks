import React from 'react'
import "../pages/Practice.css";
const Timer = ({ elapsedTime }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer">
      {formatTime(elapsedTime)}
    </div>
  )
}

export default Timer