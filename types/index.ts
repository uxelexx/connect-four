export type Board = {
  rows: number;
  columns: number;
  grid: string[][];
};

export type Player = "X" | "O";

export type Winner = Player | "Tie" | null;

export type PlayerTime = Record<Player, number>;
