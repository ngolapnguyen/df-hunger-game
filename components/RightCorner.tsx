import { useRef, useState } from "react";
import { useGameContext } from "../contexts/game";
import { client } from "../libs/apis";

export const RightCorner = () => {
  const { gameState, quitGame, mutateGameState } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  const [isAudioOff, setIsAudioOff] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onStartGame = async () => {
    if (window.confirm("Are you sure you want to start the game now?")) {
      try {
        setIsLoading(true);
        await client.startGame(gameState?.id || "");
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
    <div className="right-corner">
      {gameState && (
        <>
          <div>
            {gameState.status === "new" ? (
              <button
                type="button"
                className="quit-button"
                onClick={onStartGame}
                disabled={isLoading}
              >
                Start
              </button>
            ) : null}
            <button type="button" className="quit-button" onClick={quitGame}>
              Quit
            </button>
          </div>
          <button
            type="button"
            className="audio-button"
            onClick={onAudioButtonClick}
          >
            Sound: {isAudioOff ? "Off" : "On"}
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
