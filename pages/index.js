import styles from "../styles/Home.module.css";

export default function Home() {
  console.log("IP = ", process.env.IP);
  console.log("process.env");
  return (
    <div className={styles.container}>
      HELLO WORLD FOR MONGODB PROJECT TO SUBMIT ON HACKTHON
    </div>
  );
}
