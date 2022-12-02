export enum GameStatus {
  NEW = "new",
  PLAYING = "playing",
  COMPLETED = "completed",
}

export enum PlayerStatus {
  NEW = "new",
  JOINED = "joined",
}

export enum MoveType {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export enum ItemType {
  ITEM = "item",
}

export interface Game {
  id: string;
  map: string[][];
  no_bombs: number;
  no_items: number;
  players: Player[];
  prev_round: Record<string, MoveHistory>;
  round_expire_at: string;
  status: GameStatus;
  history: Record<string, MoveHistory>[];
  goal: Goal[];
}

export interface Player {
  id: string;
  location: {
    row: number;
    col: number;
  };
  points: number;
  status: PlayerStatus;
  token: string;
  name?: string;
}

export interface MoveHistory {
  action: "move";
  action_request: MoveType;
  action_result: MoveType;
  got_bomb: boolean;
  item: null | Item;
}

export interface Item {
  type: "item";
  value: number;
}

export interface Goal {
  player_id: string | null;
  location: {
    row: number;
    col: number;
  };
}
