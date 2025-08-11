import React from 'react'

function ScoreBoard({score}) {
  return (
    <div className = "flex justify-between w-[300px] mb-5">
      <h2 className = "text-2xl text-pink-300"> X(You) : {score.X}</h2>
      <h2 className = "text-2xl text-pink-300"> AI : {score.O}</h2> 
    </div>
  )
}

export default ScoreBoard
