import { useState } from 'react'
import './App.css'

function Square({value, clickSquare}) {
  // const [{value}, setValue] = useState(null);

  return <button className="square" onClick={clickSquare}>{value}</button>;
}

function Winner (squares) {
  //segno le combinazioni che porterebbero alla vittoria se ogni elemento fosse uguale
  const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  //ciclo per capire se una delle combinazioni è stata fatta
  for(let i= 0; i<combinations.length; i++){
    //elementi interni della combinazione corrente
    let [a,b,c] = combinations[i];
    
    //se corrispondono alle caselle: ritorna la prima casella con il segno vincitore
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]; 
    }
  }
  //se dentro il for non si entra nell'if, ritorna un solo null
  return null; 
}



export default function App() {
  const[squares, setSquares] = useState(Array(9).fill(null)); 
  const[nextIsX, setNextIsX] = useState(true);
  const[nextGame, setNextGame] = useState(false);
  //winner raccoglie il return di Winner
  const winner = Winner(squares); 
  let gameStatus; 

  


  if(winner !== null){
    gameStatus = 'Winner: ' + winner; 
    // alert(gameStatus);
  } else if (squares.every((square) => square !== null)) {
    gameStatus = 'It\'s a draw!';
  } else {
    gameStatus = 'Next to play : ' + (nextIsX === true? 'X' : '0' ); 
  }

  function handleReload() {
    window.location.reload();
    setNextGame(true);
    console.log(nextGame)

    setTimeout(()=>{
      setNextGame(false)
      console.log(nextGame)
    }, 5000)

  } 

  function handleClick(i){
    //prima di copiare l'array: 
    //controlla che la casella non sia null ovvero sia piena. se è piena, resta uguale
    if(squares[i] !== null || Winner(squares) !== null){
      return; 
    }
    const nextSquares = squares.slice();
    if (nextIsX === true){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "0";
    }

    setSquares(nextSquares);
    setNextIsX(!nextIsX);

    if (Winner(nextSquares) !== null) {
      alert('Winner is: ' + Winner(nextSquares));
    }else if(nextSquares.every((square) => square !== null)){
      alert("It's a draw!")
    }
  }

  function Title(){
    let classname = "page-title";

    if(nextGame=== true) {
      classname = "page-title active";
    }
    
    return(
      <h1 className={classname}>Tic Tac Toe</h1>
    )
  }

  return (
    <>
    <Title />
    <div className="statusgame">{gameStatus}</div>
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
    <button onClick={handleReload}>Play Again</button>
    </>
  )
}
