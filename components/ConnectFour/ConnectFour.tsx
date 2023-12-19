"use client";

import styles from "./ConnectFour.module.css";

import { useEffect, useReducer } from "react";
import { COLUMNS } from "@/constants";
import { produce } from "immer";
import { dispatcher } from "./ConnectFour.actions";
import reducer, { initialState } from "./ConnectFour.reducer";
import { checkWinner } from "./check-winner";
import Board from "../Board/Board";
import Button from "../Button/Button";
import PlayerCard from "../PlayerCard/PlayerCard";
import PlayerTurn from "../PlayerTurn/PlayerTurn";
import type { Board as BoardType, Player } from "@/types";

export default function ConnectFour() {
  const [{ board, player, winner, timer, start, score }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const isFull = board[0].every(cell => cell !== "");
  const {
    setWinnerAndGame,
    startAndPauseGame,
    restartGame,
    resetBoard,
    updateBoard,
    changePlayerAndResetTimer,
    startGame,
    timeOutSwapPlayers,
    timerCountDown,
    setWinner,
  } = dispatcher(dispatch);

  function isWinner(board: BoardType) {
    const hasWinner = checkWinner(board);

    if (hasWinner) {
      setWinnerAndGame(player);
      return;
    }
  }

  function addPiece(column: number, player: Player) {
    if (column < 0 || column >= COLUMNS || winner) {
      return;
    }

    if (!start) {
      startGame();
      return;
    }

    const row = board.findLastIndex(row => row[column] === "");

    if (row >= 0) {
      if (isFull) {
        setWinner("Tie");
        return;
      }

      const newBoard = produce(board, draft => {
        draft[row][column] = player;
      });

      updateBoard(newBoard);
      isWinner(newBoard);
      changePlayerAndResetTimer(player === "X" ? "O" : "X");
    }
  }

  useEffect(() => {
    if (!start || isFull) return;

    const interval = setInterval(() => {
      timerCountDown(player);
    }, 1000);

    if (winner) clearInterval(interval);

    if (timer[player] === 0) {
      timeOutSwapPlayers(player);
    }

    return () => clearInterval(interval);
  }, [player, timer.X, start, isFull, winner, timer]);

  return (
    <>
      <div className={styles.buttons}>
        <Button onClick={() => resetBoard()}>Reset Board</Button>
        <Button
          onClick={() => {
            if (!winner) startAndPauseGame();
          }}
        >
          {start ? "Pause" : "Start"}
        </Button>
        <Button onClick={() => restartGame()}>Restart</Button>
      </div>
      <section className={styles.section}>
        <PlayerCard score={score.X} player="X" />
        <Board board={board} addPiece={addPiece} player={player} />
        <PlayerCard score={score.O} player="O" />
      </section>
      <PlayerTurn winner={winner} player={player} timer={timer} />
    </>
  );
}
