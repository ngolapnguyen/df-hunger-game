import { Game, MoveType, Player } from "../types/game";
import fetcher from "./fetcher";

const BASE_URL = process.env.BASE_URL || "https://hunger.fly.dev";

export interface Response<T> {
  data: T;
}

// keys for swr
export const GET_PATHS = {
  gameDetail: (id: string) => `/game/${id}`,
};

class Client {
  headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  public createNewGame(game = null) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        game,
      }),
    });
  }

  public getGameDetail(id: string) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game/${id}`, {
      headers: {
        ...this.headers,
      },
    });
  }

  public joinGame(id: string, name?: string) {
    return fetcher<Response<Player>>(`${BASE_URL}/api/game/${id}/player`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        name,
      }),
    });
  }

  public startGame(id: string) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game/${id}/start`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
    });
  }

  public submitStep(gameId: string, token: string, action: MoveType) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game/${gameId}/round`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        token,
        action,
      }),
    });
  }
}

const client = new Client();

export { client };
