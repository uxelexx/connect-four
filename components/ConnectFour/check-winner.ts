import { COLUMNS, ROWS } from "@/constants";
import type { Board } from "@/types";

function checkWin(
  board: Board,
  startRow: number,
  startCol: number,
  rowIncrement: number,
  colIncrement: number,
) {
  const symbol = board[startRow][startCol];
  if (symbol === "") {
    return false;
  }

  for (let i = 1; i < 4; i++) {
    const row = startRow + i * rowIncrement;
    const col = startCol + i * colIncrement;
    if (board[row][col] !== symbol) {
      return false;
    }
  }

  return true;
}

function checkDiagonal(board: Board) {
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (checkWin(board, row, col, -1, 1)) {
        return true;
      }
    }
  }

  return false;
}

function checkDiagonalReverse(board: Board) {
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (checkWin(board, row, col, 1, 1)) {
        return true;
      }
    }
  }

  return false;
}

function checkVertical(board: Board) {
  for (let col = 0; col < COLUMNS; col++) {
    for (let row = 0; row < ROWS - 3; row++) {
      if (checkWin(board, row, col, 1, 0)) {
        return true;
      }
    }
  }
}

function checkHorizontal(board: Board) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (checkWin(board, row, col, 0, 1)) {
        return true;
      }
    }
  }

  return false;
}

export function checkWinner(board: Board) {
  return (
    checkHorizontal(board) ||
    checkVertical(board) ||
    checkDiagonal(board) ||
    checkDiagonalReverse(board)
  );
}
