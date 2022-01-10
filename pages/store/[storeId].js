import { useRouter } from "next/router";
import styles from "../../styles/Store.module.css";

export default function Store() {
  const router = useRouter();
  const { storeId } = router.query;
  return <div className={styles.container}>hello from store {storeId}</div>;
}
