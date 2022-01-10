import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLogoImg}>
        <Link href="/">
          <Image
            src={"/assets/img/logo.webp"}
            alt="logo of doge cart"
            width="40px"
            height="40px"
          />
        </Link>
      </div>
      <div className={styles.headerLogoName}>
        <span>D</span>oge <span>C</span>art
      </div>
    </div>
  );
}
