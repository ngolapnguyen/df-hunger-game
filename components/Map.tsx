import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import arrowAnimation from "../assets/lottie/arrow.json";
import explosionAnimation from "../assets/lottie/explosion.json";
import { MOVE_OFFSET } from "../constants/move";
import { useGameContext } from "../contexts/game";
import { GameStatus } from "../types/game";
import { dist } from "../utils/points";
import { WinScreen } from "./WinScreen";

const ISLAND_SIZE = 16;
const PLAYGROUND_SIZE = 12;
const GRID_ITEM_SIZE = 48;

export const Map = () => {
  const { gameState, currentPlayer, nextMove } = useGameContext();
  const playerFacingDirections = useRef<Record<string, string>>({});

  const nextMoveLocation = useMemo(() => {
    if (!currentPlayer || !nextMove) {
      return undefined;
    }

    return {
      col: currentPlayer.location.col + MOVE_OFFSET[nextMove][0],
      row: currentPlayer.location.row + MOVE_OFFSET[nextMove][1],
    };
  }, [currentPlayer, nextMove]);

  const winner = useMemo(() => {
    if (gameState?.status === GameStatus.COMPLETED) {
      let winner = gameState.players[0];

      gameState.players.forEach((player) => {
        // Update winner if this player has higher points than the last ones
        if (player.points > winner.points) {
          winner = player;
        }

        // If points are equal, and we are playing with only 1 goal
        // check which one is nearer to the goal
        if (
          gameState.goal.length === 1! &&
          gameState.goal[0].player_id &&
          player.points === winner.points &&
          dist(
            [gameState.goal[0].location.col, gameState.goal[0].location.row],
            [player.location.col, player.location.row]
          ) <
            dist(
              [gameState.goal[0].location.col, gameState.goal[0].location.row],
              [winner.location.col, winner.location.row]
            )
        ) {
          winner = player;
        }
      });

      return winner;
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState?.id && gameState?.status === GameStatus.NEW) {
      playerFacingDirections.current = gameState.players.reduce(
        (result, current, index) => {
          return {
            ...result,
            [current.id]: index % 2 === 1 ? "face-left" : "face-right",
          };
        },
        {}
      );
    }
  }, [gameState?.id]); // eslint-disable-line

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
                  colIndex === nextMoveLocation.col - 1 &&
                  rowIndex === nextMoveLocation.row - 1;

                const cellValue = gameState?.map[rowIndex][colIndex];
                let point = 0;
                try {
                  point = parseInt(cellValue as string);
                } catch {
                  // do nothing
                }

                return (
                  <div
                    className={["col", isNext ? "next" : ""].join(" ")}
                    key={colIndex}
                  >
                    {point > 0 && (
                      <span
                        className={["item", `point-${point.toString()}`].join(
                          " "
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {gameState && (
          <div className="goals">
            {gameState.goal.map((goal, index) => {
              return (
                <div
                  key={index}
                  className={`goal ${goal.player_id || ""}`}
                  style={{
                    left: (goal.location.col - 1) * GRID_ITEM_SIZE,
                    top: (goal.location.row - 1) * GRID_ITEM_SIZE,
                  }}
                >
                  <Image
                    width={64}
                    height={64}
                    src="/assets/images/portal.webp"
                    alt="goal"
                    className="goal-image"
                  />
                </div>
              );
            })}
          </div>
        )}
        {nextMoveLocation && (
          <div
            className="arrow"
            style={{
              left: (nextMoveLocation.col - 1) * GRID_ITEM_SIZE,
              top: (nextMoveLocation.row - 1) * GRID_ITEM_SIZE,
            }}
          >
            <Lottie animationData={arrowAnimation} />
          </div>
        )}
        {gameState &&
          // Find the players hit by bomb in prev round
          Object.keys(gameState.prev_round).map((playerId) => {
            const wasHit = gameState.prev_round[playerId]?.got_boom;
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
            const wasHit = gameState.prev_round[player.id]?.got_boom;

            // Decide which direction the avatar is facing
            if (gameState.prev_round[player.id]?.action_result === "left") {
              playerFacingDirections.current[player.id] = "face-left";
            } else if (
              gameState.prev_round[player.id]?.action_result === "right"
            ) {
              playerFacingDirections.current[player.id] = "face-right";
            }

            return (
              <div
                className={[
                  "player",
                  wasHit ? "hit" : "idle",
                  playerFacingDirections.current[player.id],
                ].join(" ")}
                key={player.id}
                style={{
                  left: (player.location.col - 1) * GRID_ITEM_SIZE,
                  top: (player.location.row - 1) * GRID_ITEM_SIZE,
                }}
              >
                <div className="nametag">
                  {player.id === currentPlayer?.id ? "You" : <>P{index + 1}</>}
                  <br />
                  {player.points}
                </div>
                {winner?.id === player.id && (
                  <div className="winner-tag">🎉Winner🎉</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {winner && winner.id === currentPlayer?.id && <WinScreen />}
    </>
  );
};
