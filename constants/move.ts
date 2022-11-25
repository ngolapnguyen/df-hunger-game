import { MoveType } from "../types/game";

export const MOVE_OFFSET = {
  [MoveType.UP]: [0, -1],
  [MoveType.DOWN]: [0, 1],
  [MoveType.LEFT]: [-1, 0],
  [MoveType.RIGHT]: [1, 0],
};
