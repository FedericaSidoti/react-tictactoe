import { useState } from 'react'
import './App.css'

function Square({value, clickSquare}) {
  // const [{value}, setValue] = useState(null);

  return <button className="square" onClick={clickSquare}>{value}</button>;
}

export default function App() {
  const[squares, setSquares] = useState(Array(9).fill(null)); 
  const[nextIsX, setNextIsX] = useState(true);

  function handleClick(i){
    const nextSquares = squares.slice();
    if (nextIsX === true){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "0";
    }

    setSquares(nextSquares);
    setNextIsX(!nextIsX);
  }
  return (
    <>
    <div className="board-row">
    <Square value={squares[0]} clickSquare = {()=> handleClick(0)} />
    <Square value={squares[1]} clickSquare={()=>handleClick(1)} />
    <Square value={squares[2]} clickSquare={()=>handleClick(2)}  />
    </div>
    <div className="board-row">
    <Square value={squares[3]} clickSquare={()=>handleClick(3)}  />
    <Square value={squares[4]} clickSquare={()=>handleClick(4)}  />
    <Square value={squares[5]} clickSquare={()=>handleClick(5)} />
    </div>
    <div className="board-row">
    <Square value={squares[6]} clickSquare={()=>handleClick(6)} />
    <Square value={squares[7]} clickSquare={()=>handleClick(7)} />
    <Square value={squares[8]} clickSquare={()=>handleClick(8)} />
    </div>
    </>
  )
}
