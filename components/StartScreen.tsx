import { FormEvent, useRef, useState } from "react";
import { useGameContext } from "../contexts/game";
import { client } from "../libs/apis";

export const StartScreen = () => {
  const playerNameInputRef = useRef<HTMLInputElement>(null);
  const gameIdInputRef = useRef<HTMLInputElement>(null);

  const { gameState, setGameId, setPlayerToken } = useGameContext();
  const [inspecting, setInspecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onNewGame = async () => {
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
  };

  const onJoin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const playerName = playerNameInputRef.current?.value || "";
    const gameId = gameIdInputRef.current?.value || "";

    if (!gameId) {
      return;
    }

    try {
      setIsLoading(true);

      if (!inspecting) {
        // Join the game
        const joinGameResponse = await client.joinGame(gameId, playerName);
        const playerToken = joinGameResponse.data.token;
        setPlayerToken(playerToken);
      }

      setGameId(gameId);
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
      <input
        name="playerName"
        ref={playerNameInputRef}
        placeholder="Enter your name"
        style={{
          color: "black",
        }}
        maxLength={10}
      />
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
        <label htmlFor="inspecting" className="inspecting-input">
          <input
            type="checkbox"
            name="inspecting"
            onChange={(event) => setInspecting(event.target.checked)}
            checked={inspecting}
          />
          <span>Inspect Only</span>
        </label>
      </form>
    </div>
  );
};
