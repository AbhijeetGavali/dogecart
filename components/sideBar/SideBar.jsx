import Link from "next/link";
import { useState } from "react";
import styles from "./sidebar.module.css";
export default function SideBar() {
  const [toggle, setToggle] = useState(false);

  return (
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
          toggle ? styles.homeSideBarToggledMenu : styles.homeSideBarToggleMenu
        }
      >
        <div className={styles.categoryContainerToggleBar}>
          <h2>Categories we provide</h2>
          <h3>For Mens</h3>
          <ul>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/men's/shirt"
              >
                Shirt
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/men's/t-shirt"
              >
                T-Shirt
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/men's/pants"
              >
                Pants
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/men's/shoes"
              >
                Shoes
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/men's/watch"
              >
                Watch
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/men's/hoodies"
              >
                Hoodies
              </Link>
            </li>
          </ul>
          <h3>For Womens</h3>
          <ul>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/women's/shirt"
              >
                Shirt
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/women's/t-shirt"
              >
                T-Shirt
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/women's/pants"
              >
                Pants
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/women's/shoes"
              >
                Shoes
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/women's/watch"
              >
                Watch
              </Link>
            </li>
            <li>
              <Link
                href="/products/[category]/[subcategory]"
                as="/products/women's/hoodies"
              >
                Hoodies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
