import Searchbar from "../components/searchbar/Searchbar";
import SideBar from "../components/sideBar/SideBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <SideBar />
      <Searchbar />
    </div>
  );
}
