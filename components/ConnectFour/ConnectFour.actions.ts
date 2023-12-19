import {
  ADD_PIECE,
  RESET_GAME,
  RESET_SCORE,
  RESET_TURN_TIMER,
  SET_GAME,
  SET_PLAYER,
  SET_TIMER,
  SET_WINNER,
  START_PAUSE,
  UPDATE_SCORE,
} from "@/constants";
import type { Actions, Board, Player, Winner } from "@/types";
import { Dispatch } from "react";

type DispatchFn = Dispatch<Actions>;

export const dispatcher = (dispatch: DispatchFn) => ({
  setWinnerAndGame: (player: Player) => {
    dispatch({ type: SET_WINNER, payload: player });
    dispatch({ type: SET_GAME, payload: false });
    dispatch({ type: UPDATE_SCORE, payload: player });
  },
  startAndPauseGame: () => {
    dispatch({ type: START_PAUSE });
  },
  restartGame: () => {
    dispatch({ type: RESET_GAME });
  },
  updateBoard: (board: Board) => {
    dispatch({ type: ADD_PIECE, payload: board });
  },
  changePlayerAndResetTimer: (player: Player) => {
    dispatch({ type: SET_PLAYER, payload: player });
    dispatch({ type: RESET_TURN_TIMER, payload: player });
  },
  resetBoard: () => {
    if (confirm("Are you sure you want to reset the score and restart game?")) {
      dispatch({ type: RESET_SCORE });
      dispatch({ type: RESET_GAME });
    }
  },
  startGame: () => {
    dispatch({ type: SET_GAME, payload: true });
  },
  timeOutSwapPlayers: (player: Player) => {
    dispatch({ type: RESET_TURN_TIMER, payload: player });
    dispatch({ type: SET_PLAYER, payload: player === "X" ? "O" : "X" });
  },
  timerCountDown: (player: Player) => {
    dispatch({ type: SET_TIMER, payload: player });
  },
  setWinner: (winner: Winner) => {
    dispatch({ type: SET_WINNER, payload: winner });
  },
});
