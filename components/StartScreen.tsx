import { FormEvent, useRef, useState } from "react";
import { useGameContext } from "../contexts/game";
import { client } from "../libs/apis";

export const StartScreen = () => {
  const gameIdInputRef = useRef<HTMLInputElement>(null);
  const { gameState, setGameId, setPlayerToken } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  const onNewGame = async () => {
    try {
      setIsLoading(true);

      // Create a new game
      const newGameResponse = await client.createNewGame();
      const gameId = newGameResponse.data.id;

      // Join the game
      const joinGameResponse = await client.joinGame(gameId);
      const playerToken = joinGameResponse.data.token;

      setGameId(gameId);
      setPlayerToken(playerToken);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onJoin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const gameId = gameIdInputRef.current?.value || "";

    if (!gameId) {
      return;
    }

    try {
      setIsLoading(true);

      // Join the game
      const joinGameResponse = await client.joinGame(gameId);
      const playerToken = joinGameResponse.data.token;

      setGameId(gameId);
      setPlayerToken(playerToken);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (gameState) {
    return null;
  }

  return (
    <div className="start-screen">
      <button
        type="submit"
        className="play-button"
        onClick={onNewGame}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "New Game"}
      </button>
      <div>Or</div>
      <form className="join-form" onSubmit={onJoin}>
        <input name="gameId" placeholder="Enter game ID" ref={gameIdInputRef} />
        <button type="submit" className="play-button" disabled={isLoading}>
          {isLoading ? "Loading..." : "Join"}
        </button>
      </form>
    </div>
  );
};
