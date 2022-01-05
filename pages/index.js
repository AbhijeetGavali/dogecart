import Searchbar from "../components/searchbar/Searchbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  console.log("IP = ", process.env.IP);
  console.log("process.env");
  return (
    <div className={styles.container}>
      <Searchbar />
    </div>
  );
}
