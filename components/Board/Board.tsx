import type { Board, Player } from "@/types";

import styles from "./Board.module.css";

type BoardProps = {
  board: Board;
  addPiece: (column: number, player: Player) => void;
  player: Player;
};

function Board({ board, addPiece, player }: BoardProps) {
  return (
    <div className={styles.board}>
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className={styles.row}>
          {row.map((_, columnIdx) => {
            let active = "";
            const activeCell = board[rowIdx][columnIdx];

            if (activeCell === "X") active = styles["X"];
            if (activeCell === "O") active = styles["O"];

            return (
              <div
                onClick={() => addPiece(columnIdx, player)}
                key={columnIdx}
                className={styles.cell + " " + active}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
