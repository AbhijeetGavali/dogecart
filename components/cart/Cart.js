import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./cart.module.css";

export default function Cart() {
  const cart = [
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product first sell",
      price: 342,
      qty: 2,
      extraDetails: {
        color: ["red"],
      },
    },
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product secon lorem ipsem doller d sell",
      price: 5,
      qty: 1,
      extraDetails: {
        color: ["red"],
      },
    },
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product third sell",
      price: 520,
      qty: 4,
      extraDetails: {
        color: ["red"],
        size: "M",
      },
    },
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product first sell",
      price: 342,
      qty: 2,
      extraDetails: {
        color: ["red"],
      },
    },
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product secon lorem ipsem doller d sell",
      price: 5,
      qty: 1,
      extraDetails: {
        color: ["red"],
      },
    },
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product third sell",
      price: 520,
      qty: 4,
      extraDetails: {
        color: ["red"],
        size: "M",
      },
    },
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product first sell",
      price: 342,
      qty: 2,
      extraDetails: {
        color: ["red"],
      },
    },
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product secon lorem ipsem doller d sell",
      price: 5,
      qty: 1,
      extraDetails: {
        color: ["red"],
      },
    },
    {
      url: "https://media.istockphoto.com/photos/farms-the-source-of-all-food-picture-id1303739157?b=1&k=20&m=1303739157&s=170667a&w=0&h=-Sy_PQcmcaDgvH1H5jEZi4Zoopuxem8dTBtXzvJW_xg=",
      title: "product third sell",
      price: 520,
      qty: 4,
      extraDetails: {
        color: ["red"],
        size: "M",
      },
    },
  ];
  var amount = 0;
  cart.map((product) => {
    amount += product.price;
  });

  return (
    <div className={`${styles.userCart}`}>
      <div className={styles.userCartHeadline}>
        <h2>Cart</h2>
        <Link href={"/user/cart"}>see details</Link>
      </div>
      <div className={styles.cartBody}>
        {cart.map((product, idx) => (
          <div key={idx} className={styles.product}>
            <div className={styles.productImageContainer}>
              <div className={styles.productImage}>
                <Image
                  src={product.url}
                  layout="fill"
                  alt={product.title + "image"}
                />
              </div>
            </div>
            <div className={styles.productDetails}>
              <h3>{product.title}</h3>
              <div>
                <span className={styles.amt}>
                  <span>Amt:</span>
                  <span>{product.price}</span>
                </span>
                <div className={styles.qyt}>
                  <span>Qyt:</span>
                  <button className={styles.btn}>-</button>
                  <span>{product.qty} </span>
                  <button className={styles.btn}>+</button>
                </div>
              </div>
            </div>
            <div className={styles.removeBtn}>
              <button className={styles.btn}>
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
      </div>
      <div className={styles.cartFooter}>
        <div className="totalAmount">Cart ammount: {amount}</div>
        <button
          className={styles.btn + " " + styles.checkOutBtn + " bg_gradient"}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
