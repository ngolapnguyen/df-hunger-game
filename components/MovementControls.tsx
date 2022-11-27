import { useGameContext } from "../contexts/game";
import { client } from "../libs/apis";

export const MovementControls = () => {
  const { gameState, nextMove, currentPlayer, setNextMove } = useGameContext();

  const onMove = async (move: any) => {
    if (!gameState || !currentPlayer) {
      return;
    }

    if (window.confirm(`Are you sure you want to move ${move}?`)) {
      setNextMove(move);
      await client.submitStep(gameState?.id, currentPlayer?.token, move);
    }
  };

  return (
    <div className="movement-controls">
      <button
        type="button"
        className="up"
        onClick={() => onMove("up")}
        disabled={Boolean(nextMove)}
      >
        Up
      </button>
      <button
        type="button"
        className="down"
        onClick={() => onMove("down")}
        disabled={Boolean(nextMove)}
      >
        Down
      </button>
      <button
        type="button"
        className="left"
        onClick={() => onMove("left")}
        disabled={Boolean(nextMove)}
      >
        Left
      </button>
      <button
        type="button"
        className="right"
        onClick={() => onMove("right")}
        disabled={Boolean(nextMove)}
      >
        Right
      </button>
    </div>
  );
};
