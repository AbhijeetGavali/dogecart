import Image from "next/image";
import styles from "../../styles/Home.module.css";

export default function Searchbar() {
  return (
    <>
      <form className={`${styles.container}`}>
        <div className={`${styles.searchBar}  bg_gradient`}>
          <Image
            src={"/assets/img/logo.png"}
            alt="logo of doge cart"
            width="30px"
            height="30px"
            className={`${styles.img}`}
          />
          <input
            type="search"
            placeholder="Search for the product !"
            name="search-product"
            className={`${styles.searchInputBar}`}
          />
          <Image
            src={"/assets/img/logo.png"}
            alt="logo of doge cart"
            width="30px"
            height="30px"
            className={`${styles.img}`}
          />
        </div>
      </form>
    </>
  );
}
