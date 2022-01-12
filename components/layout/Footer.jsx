import Link from "next/link";
import styles from "./layout.module.css";
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.linkGroup}>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/help">Help</Link>
      </div>
      <a>Copyright &copy; 2022 DogeCart Inc. All rights reserved.</a>
      <div className={styles.linkGroup}>
        <Link href="/policy#terms">terms</Link>
        <Link href="/policy#privacy">privacy</Link>
        <Link href="/site-map">site map</Link>
      </div>
    </div>
  );
}
