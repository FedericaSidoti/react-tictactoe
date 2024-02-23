import { useState } from 'react'
import './App.scss'

function Square({value, clickSquare}) {
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
    setSquares((Array(9).fill(null)));
    setNextGame(true);
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

    if(nextGame){setNextGame(false)};
    setSquares(nextSquares);
    setNextIsX(!nextIsX);

    if (Winner(nextSquares) !== null) {
      alert('Winner is: ' + Winner(nextSquares));
    }else if(nextSquares.every((square) => square !== null)){
      alert("It's a draw!")
    }
  }

  function Title(){
    const classname = nextGame ? 'page-title active' : 'page-title';
    return(
      <h1 className={classname}>Tic Tac Toe</h1>
    )
  }
  
  function MySquares() {
    let mysquares = []
    for(let i = 0; i < squares.length; i= i+3){
      mysquares.push(MyRow(i))
    }
    return <>{mysquares}</>
  }

  function MyRow(index : number){
    let myBoxes = []
    for (let i = index; i < index + 3; i++) {
      myBoxes.push(<Square value={squares[i]} clickSquare = {()=> handleClick(i)} />)
    }
    return(
    <div className='board-row'>
      {myBoxes}
    </div>
    )
  }

  return (
    <div className="section">
      <Title />
      <div className="statusgame">{gameStatus}</div>
      <div className="board-wrap">
        <div className="board">
          <MySquares />
        </div>
        <button className='shadow-btn' onClick={handleReload}>Play Again</button>
      </div>
    </div>
  )
}
