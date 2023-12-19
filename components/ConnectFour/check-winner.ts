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

function checkDiagonals(board: Board, reverse: boolean) {
  const rowStart = reverse ? 0 : 3;
  const rowEnd = reverse ? ROWS - 3 : ROWS;
  const rowIncrement = reverse ? 1 : -1;

  for (let row = rowStart; row < rowEnd; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (checkWin(board, row, col, rowIncrement, 1)) {
        return true;
      }
    }
  }

  return false;
}

function checkDiagonal(board: Board) {
  return checkDiagonals(board, false);
}

function checkDiagonalReverse(board: Board) {
  return checkDiagonals(board, true);
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
