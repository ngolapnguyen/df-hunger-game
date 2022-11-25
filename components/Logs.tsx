import { useState } from "react";
import { useGameContext } from "../contexts/game";

export const Logs = () => {
  const { gameState, currentPlayer } = useGameContext();
  const [isLogsExpanded, setIsLogsExpanded] = useState(false);

  return (
    <div className={["logs", isLogsExpanded ? "expanded" : ""].join(" ")}>
      <div className="header">Logs</div>
      <div className="content">
        {gameState &&
          currentPlayer &&
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
              </div>
            );
          })}
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
