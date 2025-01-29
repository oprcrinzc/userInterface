import Image from "next/image";
import styles from "./page.module.css";

import FetchDataComponent from "./components/fa";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <FetchDataComponent mode="card"/>
      </main>
    </div>
  );
}
