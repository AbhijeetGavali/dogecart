import styles from "./userIcons.module.css";

export default function UserIcons() {
  return (
    <div className={`${styles.userIcons}`}>
      <div className={`${styles.bottomIcons} bg_gradient`}>
        <div className={`${styles.userIcon}`}></div>
      </div>
      <div className={`${styles.bottomIcons} bg_gradient`}>
        <div className={`${styles.storeIcon}`}></div>
      </div>
      <div className={`${styles.bottomIcons} bg_gradient`}>
        <div className={`${styles.cartIcon}`}></div>
      </div>
    </div>
  );
}
