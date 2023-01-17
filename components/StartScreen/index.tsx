import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useGameContext } from "../../contexts/game";
import { client } from "../../libs/apis";
import { JoinGame } from "./JoinGame";

export const StartScreen = () => {
  const { gameState, setGameId, setPlayerToken } = useGameContext();

  const playerNameInputRef = useRef<HTMLInputElement>(null);
  const [action, setAction] = useState<"new" | "join">("new");
  const [isLoading, setIsLoading] = useState(false);

  const onNewGame = useCallback(async () => {
    const playerName = playerNameInputRef.current?.value || "";

    try {
      setIsLoading(true);

      // Create a new game
      const newGameResponse = await client.createNewGame();
      const gameId = newGameResponse.data.id;

      // Join the game
      const joinGameResponse = await client.joinGame(gameId, playerName);
      const playerToken = joinGameResponse.data.token;

      setGameId(gameId);
      setPlayerToken(playerToken);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [setGameId, setPlayerToken]);

  const render = useMemo(() => {
    if (gameState) {
      return null;
    }

    switch (action) {
      case "join": {
        return <JoinGame onCancel={() => setAction("new")} />;
      }
      default: {
        return (
          <div className="flex flex-col space-y-2">
            <input
              name="playerName"
              ref={playerNameInputRef}
              placeholder="Enter your name"
              maxLength={10}
              type="text"
            />
            <button
              type="submit"
              className="primary w-full"
              onClick={onNewGame}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "New Game"}
            </button>
            <div className="flex space-x-1 items-center justify-center">
              <div className="h-[1px] flex-1 bg-white/50" />
              <small className="text-white/50">Or</small>
              <div className="h-[1px] flex-1 bg-white/50" />
            </div>
            <button
              type="submit"
              className="primary w-full"
              onClick={() => setAction("join")}
              disabled={isLoading}
            >
              Join Game
            </button>
          </div>
        );
      }
    }
  }, [gameState, action, isLoading, onNewGame]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex text-white text-base p-4">
      <div className="max-w-full w-[384px] max-h-[80vh] rounded-md bg-background-primary/90 overflow-auto p-4 md:p-6 m-auto flex flex-col gap-y-4 md:gap-y-8">
        <div className="w-32 h-32 mx-auto">
          <Image src="/assets/images/logo.png" fill alt="Logo" />
        </div>
        {render}
      </div>
    </div>
  );
};
