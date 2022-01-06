import styles from "../../styles/Store.module.css";

export default function Store() {
  console.log("IP = ", process.env.IP);
  console.log("process.env");
  return <div className={styles.container}>hello from store vaa</div>;
}
