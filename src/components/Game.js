import Board from './Board';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from '../utilites/index.js';

function Game() {
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step',
    0
  );

  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    Array(9).fill(null),
  ]);

  const currentSquares = history[currentStep];
  const nextValue = calculateNextValue(currentSquares);
  const winner = calculateWinner(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  const selectSquare = (square) => {
    if (winner || currentSquares[square]) return;
    const newHistory = history.slice(0, currentStep + 1);
    const squaresCopy = [...currentSquares];
    squaresCopy[square] = nextValue;
    setHistory([...newHistory, squaresCopy]);
    setCurrentStep(newHistory.length);
  };

  const restart = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  };

  const moves = history.map((stepSquares, step) => {
    const desc = step === 0 ? 'Go to game start' : `Go to move #${step}`;
    const isCurrentStep = step === currentStep;
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
