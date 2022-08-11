import { useState, useEffect } from 'react';
import Squares from './Squares';
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from '../utilites/index.js';

function Board() {
  const [squares, setSquares] = useState(
    () => window.localStorage.getItem('squares') || Array(9).fill(null)
  );

  useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares));
  }, [squares]);

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  const selectSquare = (square) => {
    if (winner || squares[square]) return;
    const copySquares = [...squares];
    copySquares[square] = nextValue;
    setSquares(copySquares);
  };

  const restart = () => setSquares(Array(9).fill(null));

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  };

  return (
    <div>
      <div className="status">{status}</div>
      <Squares renderSquare={renderSquare} />
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

export default Board;
