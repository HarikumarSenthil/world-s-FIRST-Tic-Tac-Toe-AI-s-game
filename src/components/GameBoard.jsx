import Square from './Square'

function GameBoard({board, handleChange}) {
  return (
    <div className='grid grid-cols-3 gap-2'>
    {
        board.map((value,i)=> (
         <Square value = {value} key={i} onClick={()=> handleChange(i)}/>
        ))
    }
   
    </div>
  )
}

export default GameBoard
