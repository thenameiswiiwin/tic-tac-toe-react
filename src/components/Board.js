import Squares from './Squares';

function Board({ onClick, squares }) {
  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    );
  };

  return <Squares renderSquare={renderSquare} />;
}

export default Board;
