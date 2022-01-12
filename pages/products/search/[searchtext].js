import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SmProduct from "../../../components/productDetails/smProduct";
import SideBar from "../../../components/sideBar/SideBar";
import styles from "../../../styles/subCatrgoryProductPage.module.css";

function Category({ searchProducts }) {
  // define IP of backend to get data
  const IP = "https://dogcart.herokuapp.com";

  // using router for geting query from url
  const router = useRouter();
  const { searchtext } = router.query;

  const [searchProduct, setsearchProduct] = useState(searchProducts);
  const [count, setCount] = useState(30);

  return (
    <div className={styles.productContainer}>
      <SideBar />
      <div className={styles.productNavContainer}>
        <div className={styles.productUrl}>
          <Link href="/" as="/">
            home
          </Link>
          /<Link href="/products">products</Link>
        </div>
        <select name="sort" id="sort" className={styles.sortOption}>
          <option default value="select">
            Select Filter
          </option>
          <option value="highRated">High Rated</option>
          <option value="Latest">New Posted</option>
        </select>
      </div>
      {searchProduct.length > 0 && (
        <div className={styles.categoryOuterContainer}>
          <h2>Result products found for {searchtext}</h2>
          <div className={styles.categoryContainer}>
            {searchProduct.map((product, idx) => (
              <SmProduct key={idx} product={product} />
            ))}
          </div>
          <button
            className={styles.button + " bg_gradient"}
            onClick={async () => {
              await fetch(`${IP}/api/product/search/${searchtext}`, { count })
                .then((response) => response.json())
                .then((data) => {
                  if (data.data !== "not-found") {
                    setsearchProduct([...data.data]);
                    setCount(count + 10);
                  } else {
                    setsearchProduct([]);
                  }
                });
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const IP2 = process.env.BACKEND_IP;
  const { searchtext } = ctx.query;

  // fetching product details from category
  var propData = {
    searchProducts: [],
  };

  try {
    await fetch(`${IP2}/api/product/search/${searchtext}`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, searchProducts: [...data.data] })
          : propData;
      });

    return { props: propData };
  } catch (e) {
    console.log("Error while searching for product", e);
    console.log(`${IP2}/api/product/search/${searchtext}`);
    return { props: propData };
  }
}

export default Category;
