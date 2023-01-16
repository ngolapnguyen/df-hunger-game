import { createContext, isSSR } from "@dwarvesf/react-utils";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { useFetchWithCache } from "../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../libs/apis";
import { Game, GameStatus, MoveType, Player } from "../types/game";

interface GameContextValues {
  gameId: string;
  playerToken: string;
  isLoadingGameState: boolean;
  gameState?: Game;
  nextMove?: MoveType;
  currentPlayer?: Player;
  isInspecting?: boolean;
  setGameId: (id: string) => void;
  setPlayerToken: (token: string) => void;
  setNextMove: (move: MoveType) => void;
  quitGame: () => void;
  mutateGameState: () => void;
}

export const GAME_ID_KEY = "hg-game-id";
export const PLAYER_TOKEN_KEY = "hg-player-token";

const [Provider, useGameContext] = createContext<GameContextValues>({
  name: "game",
});

const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [gameId, _setGameId] = useState(Cookies.get(GAME_ID_KEY) || "");
  const [playerToken, _setPlayerToken] = useState(
    Cookies.get(PLAYER_TOKEN_KEY) || ""
  );
  const [isInspecting, setIsInspecting] = useState(false);

  const {
    data,
    loading: isLoadingGameState,
    mutate: mutateGameState,
  } = useFetchWithCache(
    [GET_PATHS.gameDetail(gameId)],
    () => (gameId ? client.getGameDetail(gameId) : undefined),
    {
      refreshInterval: 1000,
    }
  );
  const gameState = data?.data;
  const currentPlayer = gameState?.players.find(
    (player: Player) => player.token === playerToken
  );

  const [nextMove, setNextMove] = useState<MoveType>();

  const setGameId = (id: string) => {
    _setGameId(id);
    Cookies.set(GAME_ID_KEY, id);
  };

  const setPlayerToken = (token: string) => {
    _setPlayerToken(token);
    Cookies.set(PLAYER_TOKEN_KEY, token);
  };

  const quitGame = () => {
    if (window.confirm("Are you sure you want to quit the game?")) {
      setGameId("");
      setPlayerToken("");
      window.location.reload();
    }
  };

  useEffect(() => {
    setNextMove(undefined);
  }, [gameState?.round_expire_at, gameState?.status]); // eslint-disable-line

  useEffect(() => {
    if (gameId) {
      if (!currentPlayer) {
        setIsInspecting(true);
      } else {
        setIsInspecting(false);
      }
    }
  }, [gameId, currentPlayer]);

  return (
    <Provider
      value={{
        gameId,
        playerToken,
        isLoadingGameState,
        gameState,
        nextMove,
        currentPlayer,
        isInspecting,
        setGameId,
        setPlayerToken,
        setNextMove,
        quitGame,
        mutateGameState,
      }}
    >
      {children}
    </Provider>
  );
};

export { GameContextProvider, useGameContext };
