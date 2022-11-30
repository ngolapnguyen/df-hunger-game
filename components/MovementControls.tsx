import { useEffect, useMemo, useState } from "react";
import { useGameContext } from "../contexts/game";
import { client } from "../libs/apis";
import debounce from "lodash.debounce";

export const MovementControls = () => {
  const { gameState, nextMove, currentPlayer, isInspecting, setNextMove } =
    useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateMove = useMemo(
    () =>
      debounce(async (move: any) => {
        try {
          setIsLoading(true);
          await client.submitStep(gameState!.id, currentPlayer!.token, move);
        } catch (error) {
          alert(error);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    [currentPlayer, gameState]
  );

  const onMove = useMemo(
    () =>
      debounce(async (move: any) => {
        if (!gameState || !currentPlayer || gameState.status !== "playing") {
          return;
        }

        setNextMove(move);
        updateMove(move);
      }, 300),
    [gameState, currentPlayer, updateMove, setNextMove]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp": {
          onMove("up");
          break;
        }
        case "ArrowDown": {
          onMove("down");
          break;
        }
        case "ArrowLeft": {
          onMove("left");
          break;
        }
        case "ArrowRight": {
          onMove("right");
          break;
        }
        default: {
          break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onMove]);

  if (isInspecting) {
    return null;
  }

  return (
    <div className="movement-controls">
      <button
        type="button"
        className={["up", nextMove === "up" ? "selected" : ""].join(" ")}
        onClick={() => onMove("up")}
        disabled={isLoading}
      >
        Up
      </button>
      <button
        type="button"
        className={["down", nextMove === "down" ? "selected" : ""].join(" ")}
        onClick={() => onMove("down")}
        disabled={isLoading}
      >
        Down
      </button>
      <button
        type="button"
        className={["left", nextMove === "left" ? "selected" : ""].join(" ")}
        onClick={() => onMove("left")}
        disabled={isLoading}
      >
        Left
      </button>
      <button
        type="button"
        className={["right", nextMove === "right" ? "selected" : ""].join(" ")}
        onClick={() => onMove("right")}
        disabled={isLoading}
      >
        Right
      </button>
    </div>
  );
};
