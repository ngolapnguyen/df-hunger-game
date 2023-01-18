import { useEffect, useMemo, useState } from "react";
import { useGameContext } from "../contexts/game";
import { client } from "../libs/apis";
import Image from "next/image";
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
    <div className="movement-controls w-24 h-24 absolute bottom-2 right-2 md:bottom-4 md:right-4">
      <button
        type="button"
        className={["up left-8", nextMove === "up" ? "selected" : ""].join(" ")}
        onClick={() => onMove("up")}
        disabled={isLoading}
      >
        <Image src="/assets/spritesheets/controls/up.png" fill alt="Up" />
      </button>
      <button
        type="button"
        className={[
          "down bottom-0 left-8",
          nextMove === "down" ? "selected" : "",
        ].join(" ")}
        onClick={() => onMove("down")}
        disabled={isLoading}
      >
        <Image src="/assets/spritesheets/controls/down.png" fill alt="Down" />
      </button>
      <button
        type="button"
        className={[
          "left top-8 left-0",
          nextMove === "left" ? "selected" : "",
        ].join(" ")}
        onClick={() => onMove("left")}
        disabled={isLoading}
      >
        <Image src="/assets/spritesheets/controls/left.png" fill alt="Left" />
      </button>
      <button
        type="button"
        className={[
          "right top-8 right-0",
          nextMove === "right" ? "selected" : "",
        ].join(" ")}
        onClick={() => onMove("right")}
        disabled={isLoading}
      >
        <Image src="/assets/spritesheets/controls/right.png" fill alt="Right" />
      </button>
    </div>
  );
};
