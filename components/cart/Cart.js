import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./cart.module.css";
import {
  incrementCart,
  decrementCart,
  removeFromCart,
} from "../../redux/action/cartActions";
import { buyFromCart } from "../../redux/action/shopActions";
import { useRouter } from "next/router";

export default function Cart() {
  const { login, cart } = useSelector((state) => {
    return { login: state.user.user.login, cart: state.cart.cart };
  });

  const dispatch = useDispatch();
  const router = useRouter();

  var amount = 0;
  cart.map((product) => {
    amount += product.price;
  });

  return (
    <div className={`${styles.userCart}`}>
      {login ? (
        <>
          <div className={styles.userCartHeadline}>
            <h2>Cart</h2>
            <Link href={"/user/cart"}>see details</Link>
          </div>
          <div className={styles.cartBody}>
            {cart.length > 0 &&
              cart.map((product, idx) => (
                <div key={idx} className={styles.product}>
                  <div className={styles.productImageContainer}>
                    <div className={styles.productImage}>
                      <Image
                        src={product.productUrl[0]}
                        layout="fill"
                        alt={product.title + "image"}
                      />
                    </div>
                  </div>
                  <div className={styles.productDetails}>
                    <h3>
                      <Link
                        href={`/products/${product.category}/${product.subCategory}/${product.id}`}
                      >
                        {product.title}
                      </Link>
                    </h3>
                    <div>
                      <span className={styles.amt}>
                        <span>Amt:</span>
                        <span>{product.price}</span>
                      </span>
                      <div className={styles.qyt}>
                        <span>Qyt:</span>
                        <button
                          className={styles.btn}
                          onClick={() => {
                            dispatch(decrementCart(idx));
                          }}
                        >
                          -
                        </button>
                        <span>{product.count} </span>
                        <button
                          className={styles.btn}
                          onClick={() => {
                            dispatch(incrementCart(idx));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.removeBtn}>
                    <button
                      className={styles.btn}
                      onClick={() => {
                        dispatch(removeFromCart(idx));
                      }}
                    >
                      <Image
                        src={"/assets/img/removeFromCart.webp"}
                        alt="Remove from Cart"
                        width="15px"
                        height="15px"
                      />
                    </button>
                  </div>
                </div>
              ))}
            {!cart.length > 0 && (
              <Link href="/">
                <a>
                  Your cart is empty,
                  <br /> Brouse Products
                </a>
              </Link>
            )}
          </div>
          <div className={styles.cartFooter}>
            <div className="totalAmount">Cart ammount: {amount}</div>
            <button
              className={styles.btn + " " + styles.checkOutBtn + " bg_gradient"}
              onClick={() => {
                dispatch(buyFromCart(cart));
                router.push({
                  pathname: "/user/orders/new",
                });
              }}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className={styles.notLogedIn}>
          <h2>Cart</h2>
          <p>
            {" "}
            You are not loged in <br />
            Please log in{" "}
            <Link href="/user/login">
              <a style={{ color: "skyblue" }}>here</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
