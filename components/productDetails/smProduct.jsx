import Image from "next/image";
import Link from "next/link";
import styles from "./smProduct.module.css";
export default function SmProduct({ product }) {
  console.log("Product", product);
  let rate = 0;
  product.review.map((review) => {
    rate = rate + review.rate;
  });
  rate = rate / product.review.length;
  let width = rate + 1;
  return (
    <div>
      <div className={styles.smallProductOuterContainer}>
        <Image src={product.productUrl[0]} alt="productImg" layout="fill" />
        <div className={styles.hoverDetailsOfProduct}>
          <h3>{product.title}</h3>
          <p>{product.description.split(" ").splice(0, 25).join(" ")}...</p>
        </div>
      </div>
      <div className={styles.priceBar}>
        <div>{product.price}</div>
        <div className={styles.productStoreName}>
          <Link href="/">
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
                  <p>{product.manufacturar.description}</p>
                </div>
              </span>{" "}
            </a>
          </Link>
        </div>
        <div>{width}/5 rate</div>
      </div>
    </div>
  );
}
