import Lottie from "lottie-react";
import Image from "next/image";
import { useMemo } from "react";
import arrowAnimation from "../assets/lottie/arrow.json";
import explosionAnimation from "../assets/lottie/explosion.json";
import { MOVE_OFFSET } from "../constants/move";
import { useGameContext } from "../contexts/game";

const ISLAND_SIZE = 16;
const PLAYGROUND_SIZE = 12;
const GRID_ITEM_SIZE = 48;

export const Map = () => {
  const { gameState, currentPlayer, nextMove } = useGameContext();

  const nextMoveLocation = useMemo(() => {
    if (!currentPlayer || !nextMove) {
      return undefined;
    }

    return {
      col: currentPlayer.location.col + MOVE_OFFSET[nextMove][0],
      row: currentPlayer.location.row + MOVE_OFFSET[nextMove][1],
    };
  }, [currentPlayer, nextMove]);

  return (
    <>
      <div className="island">
        {new Array(ISLAND_SIZE).fill(0).map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {new Array(ISLAND_SIZE).fill(0).map((_, colIndex) => {
              return <div className="col" key={colIndex} />;
            })}
          </div>
        ))}
      </div>
      <div className="playground">
        <div className="grid">
          {new Array(PLAYGROUND_SIZE).fill(0).map((_, rowIndex) => (
            <div className="row" key={rowIndex}>
              {new Array(PLAYGROUND_SIZE).fill(0).map((_, colIndex) => {
                const isNext =
                  currentPlayer &&
                  nextMoveLocation &&
                  colIndex === nextMoveLocation.col &&
                  rowIndex === nextMoveLocation.row;

                const cellValue = gameState?.map[rowIndex][colIndex];
                const isGoal = cellValue === "X";

                return (
                  <div
                    className={["col", isNext ? "next" : ""].join(" ")}
                    key={colIndex}
                  >
                    {isGoal ? (
                      <Image
                        width={64}
                        height={64}
                        src="/assets/images/portal.webp"
                        alt="goal"
                        className="goal"
                      />
                    ) : (
                      cellValue
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {gameState &&
          // Find the players hit by bomb in prev round
          Object.keys(gameState.prev_round).map((playerId) => {
            const wasHit = gameState.prev_round[playerId].got_boom;
            const playerLocation = gameState.players.find(
              (player) => player.id === playerId
            )?.location;

            if (wasHit && playerLocation) {
              return (
                <div
                  className="bomb"
                  key={`${playerId}-bomb`}
                  style={{
                    left: (playerLocation.col - 1) * GRID_ITEM_SIZE,
                    top: (playerLocation.row - 1) * GRID_ITEM_SIZE,
                  }}
                >
                  <Lottie animationData={explosionAnimation} />
                </div>
              );
            }

            return null;
          })}
        <div className="players">
          {gameState?.players.map((player, index) => {
            // Was player hit by bomb in prev round?
            const wasHit = gameState.prev_round[player.id].got_boom;

            // Decide which direction the avatar is facing
            let direction = "";
            if (gameState.prev_round[player.id].action_result === "left") {
              direction = "face-left";
            }

            return (
              <div
                className={["player", wasHit ? "hit" : "idle", direction].join(
                  " "
                )}
                key={player.id}
                style={{
                  left: (player.location.col - 1) * GRID_ITEM_SIZE,
                  top: (player.location.row - 1) * GRID_ITEM_SIZE,
                }}
              >
                <div className="nametag">Player {index}</div>
              </div>
            );
          })}
        </div>
        {nextMoveLocation && (
          <div
            className="arrow"
            style={{
              left: nextMoveLocation.col * GRID_ITEM_SIZE,
              top: nextMoveLocation.row * GRID_ITEM_SIZE,
            }}
          >
            <Lottie animationData={arrowAnimation} />
          </div>
        )}
      </div>
    </>
  );
};
