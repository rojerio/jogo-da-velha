import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || newSquares[index]) return;
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index) => (
    <button
      className={`square ${squares[index]}`}
      onClick={() => handleClick(index)}
    >
      {squares[index]}
    </button>
  );

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Vencedor: ${winner}`;
  } else if (squares.every(square => square)) {
    status = "Empate!";
  } else {
    status = `Próxima jogada: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="container">
      <div className="status">{status}</div>
      <button className="restart-button" onClick={handleRestart}>
        Reiniciar Jogo
      </button>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

export default App;