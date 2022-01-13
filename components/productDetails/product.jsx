import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Faq from "../faq/Faq";
import Batch from "./Batch";
import styles from "./product.module.css";
import { addToCart } from "../../redux/action/cartActions";
import { buyProduct } from "../../redux/action/shopActions";

export default function Product({ product }) {
  const [mainProductUrl, setMainProductUrl] = useState(product.productUrl[0]);
  const [reviewTodesplay, setReviewTodesplay] = useState(3);
  const [choice, setChoice] = useState({});

  const { login } = useSelector((state) => {
    return {
      login: state.user.user.login,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    setMainProductUrl(product.productUrl[0]);
  }, [product]);

  let rate = 0;
  let rateArray = [1, 2, 3, 4, 5];
  product.review.map((review) => {
    rate = rate + review.rate;
  });
  rate = rate / product.review.length;
  let width = rate + 1;

  return (
    <div className={`${styles.productDetailsContainerOuter} bg_gradient`}>
      <section>
        <div className={styles.productImgContainer}>
          <div className={styles.productImg}>
            {product.storeDiscount && (
              <Batch percentage={product.storeDiscount} />
            )}
            <Image src={mainProductUrl} layout="fill" alt="" />
          </div>
        </div>
        <div className={styles.productImgLists}>
          {product.productUrl.map((url, idx) => (
            <div key={idx} className={styles.productImgSm}>
              {" "}
              <Image
                src={url}
                layout="fill"
                alt=""
                onClick={() => {
                  setMainProductUrl(url);
                }}
              />
            </div>
          ))}
        </div>
      </section>
      <section className={styles.productDetailsContainer}>
        <div className={styles.productStoreName}>
          <Link href={`/store/${product.manufacturar.id}`}>
            <a>
              {product.manufacturar.name}
              <span className={styles.productStoreHover}>
                <div className={styles.productStoreLogo}>
                  <Image
                    src={product.manufacturar.logo}
                    layout="fill"
                    alt="store logo"
                  />
                </div>
                <div className={styles.productStoreDetails}>
                  {" "}
                  <p>{product.manufacturar.name}</p>
                  <p>{product.manufacturar.description.slice(0, 200)}</p>
                </div>
              </span>{" "}
            </a>
          </Link>
        </div>
        <h2 className={styles.detailProductName}>{product.title}</h2>
        <div className={styles.productPriceContainer}>
          <p className={styles.price}>
            Rs.
            {product.price -
              (product.price * product.storeDiscount
                ? product.storeDiscount
                : 0)}
          </p>
          {product.storeDiscount && (
            <strike className={styles.redcut}>Rs.{product.price}</strike>
          )}
        </div>
        {product.colors && (
          <ul className={styles.choiceList}>
            {product.colors.map((color, idx) => (
              <>
                <input
                  key={idx}
                  type="radio"
                  name="color"
                  value={color}
                  id={"color" + idx}
                  onChange={(e) => {
                    setChoice({ ...choice, color: e.currentTarget.value });
                  }}
                />
                <label
                  htmlFor={"color" + idx}
                  style={{ backgroundColor: color }}
                />
              </>
            ))}
          </ul>
        )}
        {product.sizes && (
          <ul className={styles.choiceList}>
            {product.sizes.map((size, idx) => (
              <>
                <input
                  key={idx}
                  type="radio"
                  name="size"
                  value={size}
                  id={"size" + idx}
                  onChange={(e) => {
                    setChoice({ ...choice, size: e.currentTarget.value });
                  }}
                />
                <label
                  htmlFor={"size" + idx}
                  style={{
                    border: "none",
                    padding: "4px 10px",
                    background: "linear-gradient(80.3deg, #ff6047, #ff5f4783)",
                  }}
                >
                  {size}
                </label>
              </>
            ))}
          </ul>
        )}
        {product.review && (
          <div className={styles.productRatingContainer}>
            {rateArray.map((r) => {
              width = width <= 0.5 ? 0 : width < 1 ? 0 : width - 1;
              return (
                <div key={r}>
                  <span
                    className={styles.productRatingStar}
                    style={{
                      backgroundColor: width === 0 ? "transparent" : "yello",
                      transform:
                        0 < width && width < 0.5 ? "translateX(-50%)" : "",
                    }}
                  ></span>
                </div>
              );
            })}
            <span>{product.review.length} ratings</span>
          </div>
        )}

        <div className={styles.ctaBtns}>
          <button
            className={styles.btn}
            onClick={() => {
              // login
              //   ?
              dispatch(
                addToCart({
                  ...product,
                  choice,
                })
              );
              // : alert("login first");
            }}
          >
            ADD TO BAG
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              login
                ? dispatch(
                    buyProduct({
                      ...product,
                      choice,
                    })
                  )
                : alert("login first");
            }}
          >
            BUY
          </button>
        </div>
        <div className={styles.discription}>{product.description}</div>
        <div>
          <li>100% Original Product</li>
          <li>Pay on delivery might be available</li>
          <li>Easy 30 days returns and exchanges</li>
        </div>
        {product.review && (
          <div className={styles.reviewContainer}>
            <h2>Reviews</h2>
            {product.review.slice(0, reviewTodesplay).map((review, idx) => {
              return (
                <div key={idx}>
                  <h3>
                    <code>{review.name}</code>
                    <sapn className={styles.rate}>{review.rate}</sapn>
                  </h3>
                  <p>{review.comment}</p>
                </div>
              );
            })}
            <button
              onClick={() => {
                setReviewTodesplay(reviewTodesplay + 3);
              }}
            >
              Load more
            </button>
          </div>
        )}
        {product.faq && (
          <div className={styles.faqContainer}>
            <h2>Frequently Asked Questions</h2>
            {product.faq.map((q, idx) => (
              <Faq que={q.que} ans={q.ans} idx={idx} key={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
