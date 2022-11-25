import { Game, Player } from "../types/game";
import fetcher from "./fetcher";

const BASE_URL = process.env.BASE_URL || "http://51.79.240.41:4000";

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

  public createNewGame() {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
    });
  }

  public getGameDetail(id: string) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game/${id}`, {
      headers: {
        ...this.headers,
      },
    });
  }

  public joinGame(id: string) {
    return fetcher<Response<Player>>(`${BASE_URL}/api/game/${id}/player`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
    });
  }
}

const client = new Client();

export { client };
