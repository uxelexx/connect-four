import type { Actions, InitialState } from "@/types";
import { produce } from "immer";
import {
  ADD_PIECE,
  COLUMNS,
  RESET_GAME,
  RESET_SCORE,
  RESET_TIMER,
  RESET_TURN_TIMER,
  ROUND_TIME,
  ROWS,
  SET_GAME,
  SET_PLAYER,
  SET_TIMER,
  SET_WINNER,
  START_PAUSE,
  UPDATE_SCORE,
} from "@/constants";

export const initialState: InitialState = {
  board: makeGrid(),
  player: "X",
  start: false,
  timer: { O: ROUND_TIME, X: ROUND_TIME },
  winner: null,
  score: { X: 0, O: 0 },
};

export default function reducer(state: InitialState, action: Actions) {
  return produce(state, draft => {
    switch (action.type) {
      case SET_GAME: {
        draft.start = action.payload;
        break;
      }

      case START_PAUSE: {
        draft.start = !draft.start;
        break;
      }

      case ADD_PIECE: {
        draft.board = action.payload;
        break;
      }

      case SET_TIMER: {
        draft.timer[action.payload]--;
        break;
      }

      case SET_WINNER: {
        draft.winner = action.payload;
        break;
      }

      case UPDATE_SCORE: {
        draft.score[action.payload]++;
        break;
      }

      case SET_PLAYER: {
        draft.player = action.payload;
        break;
      }

      case RESET_TIMER:
      case RESET_TURN_TIMER: {
        draft.timer = { O: ROUND_TIME, X: ROUND_TIME };
        if (action.payload) {
          draft.timer[action.payload] = ROUND_TIME;
        }
        break;
      }

      case RESET_SCORE: {
        draft.score = { X: 0, O: 0 };
        break;
      }

      case RESET_GAME: {
        return { ...initialState, score: { ...draft.score }, start: true };
      }

      default: {
        return draft;
      }
    }
  });
}

function makeGrid(rows = ROWS, columns = COLUMNS): ""[][] {
  return Array.from({ length: rows }, () => Array(columns).fill(""));
}
