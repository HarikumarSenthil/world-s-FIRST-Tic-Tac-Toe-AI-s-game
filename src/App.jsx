import React, { useState,useEffect } from 'react'
import ScoreBoard from './components/ScoreBoard'
import GameBoard from './components/GameBoard'
import { GetOpenAiRouterMove } from './utils/aiOpenRoutes'
import { CheckWinner } from './utils/winner'
const App = () => {
// Set Board Values 
  const [board,setBoard] = useState(Array(9).fill(null))

// Check is Winner 
  const [winner,setWinner] = useState(null)
//
const [userTurn , setUserTurn] = useState(true)  
// Set Score  
  const [score,setScore] = useState({X:0, O:0})


// When the user Clicks the square
const handleChange = (i)=>{
  if (winner || !userTurn || board[i]) return


  const newboard = [...board]

  newboard[i] = "X"

  setBoard(newboard)
  setUserTurn(false)
}

// Winner detection
useEffect(() => {
  const result = CheckWinner(board);
  if (result && !winner) {
    setWinner(result.winner);
    if (result.winner === "X" || result.winner === "O") {
      setScore(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1
      }));
    }
  }
}, [board]);

// AI turn
useEffect(() => {
  if (!userTurn && !winner) {
    const aiTurn = async () => {
      const move = await GetOpenAiRouterMove(board);
      if (move !== null && board[move] === null) {
        const newBoard = [...board];
        newBoard[move] = "O";
        setBoard(newBoard);
        setUserTurn(true);
      }
    };
    const timeout = setTimeout(aiTurn, 600);
    return () => clearTimeout(timeout);
  }
}, [userTurn, winner, board]);


const restart = ()=>{
  setBoard(Array(9).fill(null))
  setWinner(null)
  setUserTurn(true)
}



  return (
    <div className = "bg-indigo-950 flex flex-col justify-center items-center h-lvh text-white">
        <h1 className="font-bold text-3xl text-center mb-3">
         Tic Tac AI 🤖
         </h1>
        <ScoreBoard score= {score}/>
        <GameBoard board={board} handleChange={handleChange}/>
        {winner && (
          <div className ="mt-5 flex flex-row justify-between w-[200px]">
         <p className='p-2'>     { winner === "DRAW" ? "It's is draw!" :    `${winner} wins!`} </p>
        <button onClick = {restart} className = "bg-blue-500 rounded-lg p-2 cursor-pointer"> Play Again!</button>
          </div>
        )}
    </div>
  )
}

export default App
