import React,{useState} from 'react';

export default function Game(){
  const [history,setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber,setStepNumber] = useState(0);
  const currentSquares = history[stepNumber];
  const xIsNext = stepNumber%2===0;
  function handlePlay(newSquares){
    setHistory([...history.slice(0,stepNumber+1),newSquares]);
    setStepNumber(stepNumber+1);
  }
  function jumpTo(move){
    setStepNumber(move);
  }
  const movesHistory = history.map((squares,move)=>{
    const description = move ? `Go to move #${move}` : 'Go to game start';
    const isCurrentMove = move === stepNumber;
    if(isCurrentMove){
      return (
        <li key={move}>
          {`You are at move #${move}`}
        </li>
      );
    }
    return (
      <li key={move}>
        <button onClick={()=>{jumpTo(move)}}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{movesHistory}</ol>
      </div>
    </div>
  );
}
/**
 * Board component
 * @returns 
 */
function Board({squares,xIsNext,onPlay}) {
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
    onPlay(newSquares);
  }
  return (
    <div>
        <p className='status'>{showStatus(winner,xIsNext)}</p>
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

function showStatus(winner, xIsNext) {
  if (winner) {
    return 'Winner: ' + winner;
  }
  return 'Next player: ' + (xIsNext ? 'X' : 'O');
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