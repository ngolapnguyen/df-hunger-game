import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useGameContext } from "../contexts/game";
import { client } from "../libs/apis";

export const RightCorner = () => {
  const { gameState, currentPlayer, quitGame, mutateGameState } =
    useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  const [isAudioOff, setIsAudioOff] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onStartGame = async () => {
    if (window.confirm("Are you sure you want to start the game now?")) {
      try {
        setIsLoading(true);
        await client.startGame(gameState?.id || "", currentPlayer!.token);
        mutateGameState();
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onAudioButtonClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        audioRef.current.volume = 0.3;
        setIsAudioOff(false);
      } else {
        audioRef.current.pause();
        setIsAudioOff(true);
      }
    }
  };

  return (
    <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50 flex flex-col items-end gap-y-2 md:gap-y-4">
      {gameState && (
        <>
          <div className="flex gap-2 md:gap-4">
            {gameState.status === "new" &&
            gameState.players[0].id === currentPlayer?.id ? (
              <button
                type="button"
                className="text-md md:text-xl text-white px-1 py-1 md:px-3 md:py-2 bg-blue-500 rounded-md hover:scale-105"
                onClick={onStartGame}
                disabled={isLoading}
              >
                Start
              </button>
            ) : null}
            <button
              type="button"
              className="text-md md:text-xl text-white px-1 py-1 md:px-3 md:py-2 bg-red-500 rounded-md hover:scale-105"
              onClick={quitGame}
            >
              Quit
            </button>
          </div>
          <button
            type="button"
            className="text-xl text-white"
            onClick={onAudioButtonClick}
          >
            {isAudioOff ? (
              <Icon icon="akar-icons:sound-off" width={24} height={24} />
            ) : (
              <Icon icon="akar-icons:sound-on" width={24} height={24} />
            )}
          </button>
          <audio
            src="/assets/sounds/track02.mp3"
            ref={audioRef}
            loop
            autoPlay={false}
          />
        </>
      )}
    </div>
  );
};
