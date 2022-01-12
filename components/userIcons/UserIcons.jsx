import { useRouter } from "next/router";
import { useState } from "react";
import Cart from "../cart/Cart";
import MiniDashboard from "../userMiniDashboard/MiniDashboard";
import styles from "./userIcons.module.css";

export default function UserIcons() {
  const [toggleCart, setToggleCart] = useState(false);
  const [userHome, setUserHome] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className={`${styles.userIcons}`}>
        <div className={`${styles.bottomIcons} bg_gradient`}>
          <div
            onClick={() => {
              router.push("/store/create-new");
            }}
            className={`${styles.storeIcon}`}
          ></div>
        </div>
        <div className={`${styles.bottomIcons} bg_gradient`}>
          <div
            onClick={() => {
              setToggleCart(!toggleCart);
            }}
            className={`${styles.cartIcon}`}
          ></div>
        </div>
        <div className={`${styles.bottomIcons} bg_gradient`}>
          <div
            onClick={() => {
              setUserHome(!userHome);
            }}
            className={`${styles.userIcon}`}
          ></div>
        </div>
      </div>
      {!toggleCart && <Cart />}
      {!userHome && <MiniDashboard />}
    </>
  );
}
