import Head from "next/head";
import UserIcons from "../userIcons/UserIcons";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Doge Cart - cart for everyone</title>
        <link rel="icon" type="image/webp" href="/assets/img/logo.webp" />
      </Head>
      <div className="app">
        <Header />
        <div className={styles.main}>{children}</div>
        <UserIcons />
        <Footer />
      </div>
    </>
  );
}
