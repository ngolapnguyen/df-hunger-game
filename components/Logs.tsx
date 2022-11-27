import { useMemo, useState } from "react";
import { useGameContext } from "../contexts/game";

export const Logs = () => {
  const { gameState, currentPlayer } = useGameContext();
  const [isLogsExpanded, setIsLogsExpanded] = useState(false);

  const goalLocation = useMemo(() => {
    let goalCol = -1;
    let goalRow = -1;

    if (gameState) {
      gameState.map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          if (col === "X") {
            goalCol = colIndex + 1;
            goalRow = rowIndex + 1;
          }
        });
      });
    }

    return {
      col: goalCol,
      row: goalRow,
    };
  }, [gameState]);

  return (
    <div className={["logs", isLogsExpanded ? "expanded" : ""].join(" ")}>
      <div className="header">Logs</div>
      <div className="content">
        {gameState && currentPlayer && gameState.history.length > 0 ? (
          gameState.history.map((roundHistory, index) => {
            const playerHistory = roundHistory[currentPlayer.id];

            return (
              <div className="log-item" key={index}>
                You {playerHistory.action} {playerHistory.action_result}.
                {playerHistory.got_boom && (
                  <div className="danger">You hit a bomb!</div>
                )}
                {playerHistory.item && (
                  <div className="success">
                    You got {playerHistory.item.value} points!
                  </div>
                )}
                {currentPlayer.location.row === goalLocation.row &&
                  currentPlayer.location.col === goalLocation.col && (
                    <div className="success">You reached the goal!</div>
                  )}
              </div>
            );
          })
        ) : (
          <div className="log-item">No logs.</div>
        )}
      </div>
      <button
        type="button"
        className="expand-button"
        onClick={() => setIsLogsExpanded((o) => !o)}
      >
        {!isLogsExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 8l6 6H6z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 16l-6-6h12z" />
          </svg>
        )}
      </button>
    </div>
  );
};
