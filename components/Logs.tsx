import { useMemo, useState } from "react";
import { useGameContext } from "../contexts/game";
import { MoveHistory } from "../types/game";

export const Logs = () => {
  const { gameState, currentPlayer, isInspecting } = useGameContext();
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

  const historyByPlayer = useMemo(() => {
    return (gameState?.history || []).reduce(
      (result, current) => {
        const playerIds = Object.keys(current);
        const nextResult = { ...result };

        playerIds.forEach((playerId) => {
          nextResult[playerId] = [
            ...(nextResult[playerId] || []),
            current[playerId],
          ];
        });

        return nextResult;
      },
      {
        a: [],
        b: [],
        c: [],
        d: [],
      } as Record<string, MoveHistory[]>
    );
  }, [gameState]);

  return (
    <div className={["logs", isInspecting ? "inspecting" : ""].join(" ")}>
      <div className="logs-container">
        {Object.keys(historyByPlayer)
          .filter(
            (playerId) =>
              isInspecting || (!isInspecting && playerId === currentPlayer?.id)
          )
          .map((playerId, index) => {
            return (
              <div
                className={[
                  "log text-xl",
                  isLogsExpanded ? "expanded" : "",
                ].join(" ")}
                key={playerId}
              >
                <div className="header">
                  {isInspecting ? <>{`P${index + 1}`}&nbsp;</> : ""} Logs
                </div>
                <div className="content">
                  {historyByPlayer[playerId].length > 0 ? (
                    historyByPlayer[playerId].map((history, historyIndex) => {
                      return (
                        <div className="log-item" key={historyIndex}>
                          {isInspecting ? `P${index + 1}` : "You"}{" "}
                          {history.action} {history.action_result}.
                          {history.got_bomb && (
                            <div className="danger">
                              {isInspecting ? `P${index + 1}` : "You"} hit a
                              bomb!
                            </div>
                          )}
                          {history.item && (
                            <div className="success">
                              {isInspecting ? `P${index + 1}` : "You"} got{" "}
                              {history.item.value} points!
                            </div>
                          )}
                          {playerId === currentPlayer?.id &&
                            currentPlayer?.location.row === goalLocation.row &&
                            currentPlayer?.location.col ===
                              goalLocation.col && (
                              <div className="success">
                                {isInspecting ? `P${index + 1}` : "You"} reached
                                the goal!
                              </div>
                            )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="log-item">No logs.</div>
                  )}
                </div>
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
