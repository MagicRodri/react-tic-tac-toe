import React,{useState} from 'react';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  function handleClick(buttonIndex) {
    const newSquares = [...squares];
    if (newSquares[buttonIndex] !== null) {
      return;
    }
    if (xIsNext) {
      newSquares[buttonIndex] = 'X';
    } else {
      newSquares[buttonIndex] = 'O';
    }
    setXIsNext(!xIsNext);
    setSquares(newSquares);
  }
  return (
    <div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)} />
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)} />
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)} />
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)} />
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)} />
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)} />
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)} />
      </div>
    </div>
  );
}

function Square(props) {
  return (
    <button className='square' onClick={props.onSquareClick}>
      {props.value}
    </button>
  )
}