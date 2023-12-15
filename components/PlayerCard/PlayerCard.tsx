import React from "react";

import { Player } from "@/types";

import styles from "./PlayerCard.module.css";

type PlayerCardProps = {
  score: number;
  player: Player;
};

export default function PlayerCard({ score, player }: PlayerCardProps) {
  return (
    <div data-player={player} className={styles["player-card"]}>
      <h4>Player {player}</h4>
      <p>{score}</p>
    </div>
  );
}
