import ConnectFour from "@/components/ConnectFour/ConnectFour";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ConnectFour />
    </main>
  );
}
