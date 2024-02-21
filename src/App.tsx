import { useState } from 'react'
import './App.css'

function Square() {
  const [value, setValue] = useState(null);
  function click(){
    setValue('x');
  }
  return <button className="square" onClick={click}>{value}</button>;
}

export default function App() {
  return (
    <>
    <div className="board-row">
    <Square  />
    <Square  />
    <Square  />
    </div>
    <div className="board-row">
    <Square />
    <Square  />
    <Square  />
    </div>
    <div className="board-row">
    <Square  />
    <Square  />
    <Square  />
    </div>
    </>
  )
}