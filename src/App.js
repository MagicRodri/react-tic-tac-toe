import React,{useState} from 'react';

/**
 * Board component
 * @returns 
 */
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = getWinner(squares);
  function handleClick(buttonIndex) {
    const newSquares = [...squares];
    if (newSquares[buttonIndex] !== null || getWinner(newSquares)) {
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
        <p className='status'>{status(winner,xIsNext)}</p>
      <div>
        <div className='board-row'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className='board-row'>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className='board-row'>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

/**
 * Square component
 * @param {*} props 
 * @returns 
 */
function Square(props) {
  return (
    <button className='square' onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}

function status(winner, xIsNext) {
  if (winner) {
    return 'Winner: ' + winner;
  }
  return 'Next player: ' + xIsNext ? 'X' : 'O';
}

/**
 * Check winner
 * @param {Array} squares Board squares
 * @returns {String} Winner
 */
function getWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}