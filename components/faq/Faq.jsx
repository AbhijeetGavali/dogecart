import { useState } from "react";
import styles from "./faq.module.css";
export default function Faq({ que, ans, idx }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={styles.questionContainer}>
      <h3
        className={styles.question}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {idx + 1}&#41; {que}
      </h3>
      {toggle && <p className={styles.answer}>{ans}</p>}
    </div>
  );
}
