export type Board = (Player | "")[][];

export type Player = "X" | "O";
export type Winner = Player | "Tie" | null;
export type PlayerTime = Record<Player, number>;
export type PlayerScore = Record<Player, number>;

export type InitialState = {
  board: Board;
  start: boolean;
  player: Player;
  winner: Winner;
  timer: PlayerTime;
  score: PlayerScore;
};

export type Actions =
  | { type: "SET_GAME"; payload: boolean }
  | { type: "START_PAUSE" }
  | { type: "ADD_PIECE"; payload: Board }
  | { type: "SET_TIMER"; payload: Player }
  | { type: "SET_WINNER"; payload: Winner }
  | { type: "UPDATE_SCORE"; payload: Player }
  | { type: "SET_PLAYER"; payload: Player }
  | { type: "RESET_TIMER"; payload: Player }
  | { type: "RESET_TURN_TIMER"; payload: Player }
  | { type: "RESET_GAME" | "RESET_SCORE" };
