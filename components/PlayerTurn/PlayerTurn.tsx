import type { Player, PlayerTime, Winner } from "@/types";

import styles from "./PlayerTurn.module.css";

type PlayerTurnProps = {
  winner: Winner;
  player: Player;
  timer: PlayerTime;
};

export default function PlayerTurn({ winner, player, timer }: PlayerTurnProps) {
  return (
    <div data-player={winner || player} className={styles.info}>
      {winner ? (
        <>
          <h4>Winner:</h4>
          <p>{winner}</p>
        </>
      ) : (
        <>
          <h4>{`${player}'s turn`}</h4>
          <p>{timer[player]}</p>
        </>
      )}
    </div>
  );
}
