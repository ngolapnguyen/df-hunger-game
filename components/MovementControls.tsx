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
    <div className="w-24 h-24 md:w-36 md:h-36 absolute bottom-2 right-2 md:bottom-4 md:right-4 grid grid-rows-3">
      <div className="flex justify-center">
        <button
          type="button"
          className={[
            "up h-full aspect-square hover:scale-105",
            nextMove === "up" ? "border-2 rounded-md	border-blue-500" : "",
          ].join(" ")}
          onClick={() => onMove("up")}
          disabled={isLoading}
        >
          <Image src="/assets/spritesheets/controls/up.png" fill alt="Up" />
        </button>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className={[
            "left h-full aspect-square hover:scale-105",
            nextMove === "left" ? "border-2 rounded-md	border-blue-500" : "",
          ].join(" ")}
          onClick={() => onMove("left")}
          disabled={isLoading}
        >
          <Image src="/assets/spritesheets/controls/left.png" fill alt="Left" />
        </button>
        <button
          type="button"
          className={[
            "right h-full aspect-square hover:scale-105",
            nextMove === "right" ? "border-2 rounded-md	border-blue-500" : "",
          ].join(" ")}
          onClick={() => onMove("right")}
          disabled={isLoading}
        >
          <Image
            src="/assets/spritesheets/controls/right.png"
            fill
            alt="Right"
          />
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className={[
            "down h-full aspect-square hover:scale-105",
            nextMove === "down" ? "border-2 rounded-md	border-blue-500" : "",
          ].join(" ")}
          onClick={() => onMove("down")}
          disabled={isLoading}
        >
          <Image src="/assets/spritesheets/controls/down.png" fill alt="Down" />
        </button>
      </div>
    </div>
  );
};
