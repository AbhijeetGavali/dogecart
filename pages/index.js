import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Searchbar from "../components/searchbar/Searchbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.homeSideBar}>
        <div
          className={
            toggle
              ? styles.homeSideBarToggledButton
              : styles.homeSideBarToggleButton
          }
          onClick={() => {
            setToggle(!toggle);
          }}
        ></div>
        <div
          className={
            toggle
              ? styles.homeSideBarToggledMenu
              : styles.homeSideBarToggleMenu
          }
        >
          <div className={styles.categoryContainerToggleBar}>
            <h2>Categories we provide</h2>
            <h3>For Mens</h3>
            <ul>
              <li>
                <Link href="/men's/shirt">Shirt</Link>
              </li>
              <li>
                <Link href="/men's/t-shirt">T-Shirt</Link>
              </li>
              <li>
                <Link href="/men's/pants">Pants</Link>
              </li>
              <li>
                <Link href="/men's/shoes">Shoes</Link>
              </li>
              <li>
                <Link href="/men's/watch">Watch</Link>
              </li>
              <li>
                <Link href="/men's/hoodies">Hoodies</Link>
              </li>
            </ul>
            <h3>For Womens</h3>
            <ul>
              <li>
                <Link href="/women's/shirt">Shirt</Link>
              </li>
              <li>
                <Link href="/women's/t-shirt">T-Shirt</Link>
              </li>
              <li>
                <Link href="/women's/pants">Pants</Link>
              </li>
              <li>
                <Link href="/women's/shoes">Shoes</Link>
              </li>
              <li>
                <Link href="/women's/watch">Watch</Link>
              </li>
              <li>
                <Link href="/women's/hoodies">Hoodies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Searchbar />
    </div>
  );
}
