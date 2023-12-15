"use client";

import styles from "./ConnectFour.module.css";

import type { Board as BoardType, Player, PlayerTime, Winner } from "@/types";
import { useEffect, useState } from "react";
import Board from "../Board/Board";
import Button from "../Button/Button";
import PlayerCard from "../PlayerCard/PlayerCard";
import PlayerTurn from "../PlayerTurn/PlayerTurn";
import { checkWinner } from "./check-winner";

const ROWS = 6;
const COLUMNS = 7;
const ROUND_TIME = 5;

function makeGrid(rows = ROWS, columns = COLUMNS) {
  return Array.from({ length: rows }, () => Array(columns).fill(""));
}

const initialBoard: BoardType = {
  rows: ROWS,
  columns: COLUMNS,
  grid: makeGrid(),
};

const initialTimer: PlayerTime = {
  X: ROUND_TIME,
  O: ROUND_TIME,
};

export default function ConnectFour() {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [player, setPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Winner>(null);
  const [timer, setTimer] = useState<PlayerTime>(initialTimer);
  const [score, setScore] = useState<Record<Player, number>>({ X: 0, O: 0 });
  const [start, setStart] = useState(false);
  const isFull = board.grid[0].every(cell => cell !== "");

  function isWinner(board: BoardType) {
    const hasWinner = checkWinner(board);

    if (hasWinner) {
      setWinner(player);
      setStart(false);
      setScore(prevScore => ({
        ...prevScore,
        [player]: prevScore[player] + 1,
      }));
    }
  }

  function resetTimer(player: Player) {
    setTimer(prevTimer => ({ ...prevTimer, [player]: ROUND_TIME }));
  }

  function startAndPauseGame() {
    if (winner) return;
    setStart(!start);
  }

  function resetScore() {
    if (confirm("Are you sure you want to reset the score and restart game?")) {
      setScore({ X: 0, O: 0 });
      restartGame();
    }
  }

  function addPiece(column: number, player: Player) {
    if (column < 0 || column >= board.columns || winner) {
      return;
    }

    if (!start) {
      setStart(true);
      return;
    }

    const row = board.grid.findLastIndex(row => row[column] === "");

    if (row >= 0) {
      if (isFull) {
        setWinner("Tie");
        return;
      }
      const updateGrid = [...board.grid];
      updateGrid[row][column] = player;

      setBoard(prevBoard => ({
        ...prevBoard,
        grid: updateGrid,
      }));

      isWinner(board);

      setPlayer(player === "X" ? "O" : "X");
      resetTimer(player === "X" ? "O" : "X");
    }
  }

  function restartGame() {
    setBoard({
      ...initialBoard,
      grid: makeGrid(),
    });
    setWinner(null);
    setPlayer("X");
    setTimer(initialTimer);
    setStart(true);
  }

  useEffect(() => {
    if (!start) return;
    if (isFull) {
      setWinner("Tie");
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => ({
        ...prev,
        [player]: prev[player] - 1,
      }));
    }, 1000);

    if (winner) clearInterval(interval);
    if (timer.X === 0) {
      resetTimer("X");
      setPlayer("O");
    }
    if (timer.O === 0) {
      resetTimer("O");
      setPlayer("X");
    }

    return () => clearInterval(interval);
  }, [player, timer.X, timer.O, winner, start, isFull]);

  return (
    <>
      <div className={styles.buttons}>
        <Button onClick={() => resetScore()}>Reset Score</Button>
        <Button onClick={() => startAndPauseGame()}>
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
