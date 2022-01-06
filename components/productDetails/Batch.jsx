import styles from "./batch.module.css";
export default function Batch({ percentage }) {
  return (
    <div className={styles.batchContainer}>
      <span>{percentage * 100}%</span>
    </div>
  );
}
