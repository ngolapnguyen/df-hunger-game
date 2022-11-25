import { useGameContext } from "../contexts/game";

export const MovementControls = () => {
  const { setNextMove } = useGameContext();

  const onMove = (move: any) => {
    if (window.confirm(`Are you sure you want to move ${move}?`)) {
      setNextMove(move);
    }
  };

  return (
    <div className="movement-controls">
      <button type="button" className="up" onClick={() => onMove("up")}>
        Up
      </button>
      <button type="button" className="down" onClick={() => onMove("down")}>
        Down
      </button>
      <button type="button" className="left" onClick={() => onMove("left")}>
        Left
      </button>
      <button type="button" className="right" onClick={() => onMove("right")}>
        Right
      </button>
    </div>
  );
};
