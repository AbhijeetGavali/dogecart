// importing dependancies
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// importing components, styles defined
import SmProduct from "../../../components/productDetails/smProduct";
import styles from "../../../styles/subCatrgoryProductPage.module.css";

// main functional component
function Category({ categoryProducts }) {
  // define IP of backend to get data
  const IP = "http://localhost:5000";

  // using router for geting query from url
  const router = useRouter();
  const { category } = router.query || "";

  const [categoryProduct, setcategoryProduct] = useState(categoryProducts);
  const [count, setCount] = useState(30);

  // returning jsx element to client
  return (
    <div className={styles.productContainer}>
      <div className={styles.productNavContainer}>
        <div className={styles.productUrl}>
          {/* top navigation link */}
          <Link href="/">
            <a>home</a>
          </Link>
          /
          <Link href="/products">
            <a>products</a>
          </Link>
          /
          <Link as={`/products/${category}`} href="/products/[category]">
            <a>{category}</a>
          </Link>
          /
        </div>

        {/* normal select dropdown to the page  */}
        <select name="sort" id="sort" className={styles.sortOption}>
          <option default value="select">
            Select Filter
          </option>
          <option value="highRated">High Rated</option>
          <option value="Latest">New Posted</option>
        </select>
      </div>

      {/* displaying data to page of products awailable  */}
      {categoryProduct.length > 0 && (
        <div className={styles.categoryOuterContainer}>
          <h2>simmilar products for {category}</h2>
          <div className={styles.categoryContainer}>
            {categoryProduct.map((product, idx) => (
              <SmProduct key={idx} product={product} />
            ))}
          </div>

          {/* for loading more result  */}
          <button
            className={styles.button + " bg_gradient"}
            onClick={async () => {
              await fetch(`${IP}/api/product/${category}`, { count })
                .then((response) => response.json())
                .then((data) => {
                  if (data.data !== "not-found") {
                    setcategoryProduct([...data.data]);
                    setCount(count + 10);
                  } else {
                    setcategoryProduct([]);
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

// generating initial props for loading initial page on server
export async function getServerSideProps(ctx) {
  // declaring constents to use
  const IP2 = process.env.BACKEND_IP;
  const { category } = ctx.query;

  // define props object to usee
  var propData = {
    categoryProducts: [],
  };

  try {
    // fetching product details from category
    await fetch(`${IP2}/api/product/${category}`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, categoryProducts: [...data.data] })
          : propData;
      });

    return { props: propData };
  } catch (e) {
    // error occured while fetching data
    console.log("error from category page : ", e);
    console.log(`url: ${IP2}/api/product/${category}`);
    console.log(propData);
    return { props: propData };
  }
}

// default export of the page
export default Category;
