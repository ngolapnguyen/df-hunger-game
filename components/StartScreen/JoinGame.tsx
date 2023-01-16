import { Icon } from "@iconify/react";
import classNames from "classnames";
import { useRef, useState } from "react";
import useSWR from "swr";
import { useGameContext } from "../../contexts/game";
import { client, GET_PATHS } from "../../libs/apis";

interface Props {
  onCancel: () => void;
}

export const JoinGame = (props: Props) => {
  const { onCancel } = props;

  const playerNameInputRef = useRef<HTMLInputElement>(null);
  const { setGameId, setPlayerToken } = useGameContext();
  const [gameIdToJoin, setGameIdToJoin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: isLoadingGameList } = useSWR([GET_PATHS.game], () =>
    client.getGameList()
  );
  const games = data?.data || [];

  const onJoin = async () => {
    const playerName = playerNameInputRef.current?.value || "";

    if (!gameIdToJoin) {
      return;
    }

    try {
      setIsLoading(true);

      // Join the game
      const joinGameResponse = await client.joinGame(gameIdToJoin, playerName);
      const playerToken = joinGameResponse.data.token;
      setPlayerToken(playerToken);
      setGameId(gameIdToJoin);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onInspect = () => {
    setGameId(gameIdToJoin);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2 text-xl">
        <button type="button" onClick={onCancel}>
          <Icon icon="icon-park-outline:left-small" />
        </button>
        <div>Join Game</div>
      </div>
      <input
        name="playerName"
        ref={playerNameInputRef}
        placeholder="Enter your name"
        maxLength={10}
        type="text"
      />
      <div className="flex flex-col space-y-1 flex-1">
        <div className="uppercase text-xs font-medium text-white/70">Games</div>
        <div className="div flex flex-col space-y-2 p-2 rounded-md bg-white/5 overflow-auto max-h-[50vh]">
          {games.map((game) => {
            const isSelected = gameIdToJoin === game.id;

            const joinedPlayerCount = game.players.filter(
              (player) => player.status === "joined"
            ).length;

            return (
              <div
                className={classNames(
                  "flex justify-between space-x-2 rounded p-2 hover:bg-background-secondary/50 cursor-pointer",
                  {
                    "bg-background-secondary": isSelected,
                    "bg-background-secondary/30": !isSelected,
                  }
                )}
                key={game.id}
                onClick={() => setGameIdToJoin(game.id)}
              >
                <div>
                  {game.id}{" "}
                  <span className="text-white/50">
                    by {game.players[0].name}
                  </span>
                </div>
                <div>{joinedPlayerCount}/4</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          className="primary flex-1"
          onClick={onInspect}
          disabled={isLoading}
        >
          Inspect
        </button>
        <button
          type="submit"
          className="primary flex-1"
          onClick={onJoin}
          disabled={isLoading}
        >
          Join
        </button>
      </div>
    </div>
  );
};
