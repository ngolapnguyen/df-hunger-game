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
    <div
      className={[
        "absolute bottom-0 left-2 md:left-4",
        isInspecting ? "transform-none" : "",
      ].join(" ")}
    >
      <div className="flex overflow-x-auto overflow-y-hidden max-w-3xl gap-x-2">
        {Object.keys(historyByPlayer)
          .filter(
            (playerId) =>
              isInspecting || (!isInspecting && playerId === currentPlayer?.id)
          )
          .map((playerId, index) => {
            return (
              <div
                className={[
                  "bg-blue-400 w-40 h-40 md:w-60 md:h-60 p-3 flex flex-col items-center translate-y-48 transition-all text-xl rounded-md",
                  isLogsExpanded ? "!translate-y-0" : "",
                ].join(" ")}
                key={playerId}
              >
                <div className="text-white text-center mb-2 md:mb-4 px-2 md:px-4">
                  {isInspecting ? <>{`P${index + 1}`}&nbsp;</> : ""} Logs
                </div>
                <div className="flex-1 w-full overflow-auto">
                  {historyByPlayer[playerId].length > 0 ? (
                    historyByPlayer[playerId].map((history, historyIndex) => {
                      return (
                        <div
                          className="bg-white p-1 text-xs"
                          key={historyIndex}
                        >
                          {isInspecting ? `P${index + 1}` : "You"}{" "}
                          {history.action} {history.action_result}.
                          {history.got_bomb && (
                            <div className="text-red-500">
                              {isInspecting ? `P${index + 1}` : "You"} hit a
                              bomb!
                            </div>
                          )}
                          {history.item && (
                            <div className="text-green-500">
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
                    <div className="bg-white h-8 p-1 mb-1 rounded-sm text-xs flex flex-col justify-center text-center">
                      No logs.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <button
        type="button"
        className="bg-white rounded-md cursor-pointer absolute bottom-2 md:bottom-4 -right-8 w-6 h-6"
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
