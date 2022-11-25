import { useGameContext } from "../contexts/game";

export const RightCorner = () => {
  const { gameState, quitGame } = useGameContext();

  return (
    <div className="right-corner">
      {gameState && (
        <button type="button" className="quit-button" onClick={quitGame}>
          Quit
        </button>
      )}
    </div>
  );
};
