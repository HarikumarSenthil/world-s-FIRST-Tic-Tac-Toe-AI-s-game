export const CheckWinner = (board)=>{
    const lines = [
        [0,1,2], // Top Row 
        [3,4,5], // Middle Row 
        [6,7,8], // Low Row 

        [0,3,6], // First Column 
        [1,4,7], // Second Column
        [2,5,8], // Third Column 
         
        [0,4,8], // left to right Diagonal 
        [2,4,6] // right to left Diagonal 
    ]
    for (let line of lines){
        const [a,b,c] = line 

      // To Check Winner or Draw 

      // 1. Check if the board[i] value is not null 
      // 2. board[a] === board[b]
      // 3. board[a] === board[c]

      if (board[a] && board[a] === board[b] && board[a] === board[c]){
        return {winner:board[a], line}
      }  
    }


 // Check if the match is draw or not    
if (board.every(cell => cell !== null)){
    return {winner: "Draw", line:[]}
}


// if no winner and the board in not full yet , return null 
return null 
}