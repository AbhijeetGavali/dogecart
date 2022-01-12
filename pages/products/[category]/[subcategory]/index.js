// importing dependencies
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// importing components, styles defined
import SmProduct from "../../../../components/productDetails/smProduct";
import SideBar from "../../../../components/sideBar/SideBar";
import styles from "../../../../styles/subCatrgoryProductPage.module.css";

// main functional component
function Subcategory({ categoryProducts, subCategoryProducts }) {
  // define IP of backend to get data
  const IP = "https://dogcart.herokuapp.com";

  // using router for geting query from url
  const router = useRouter();
  const { category, subcategory } = router.query;

  const [categoryProduct, setcategoryProduct] = useState(categoryProducts);
  const [subCategoryProduct, setSubCategoryProduct] =
    useState(subCategoryProducts);
  const [count, setCount] = useState({ category: 10, subcategory: 30 });

  useEffect(() => {
    setcategoryProduct(categoryProducts);
    setSubCategoryProduct(subCategoryProducts);
  }, [categoryProducts, subCategoryProducts]);

  // returning jsx element to client
  return (
    <div className={styles.productContainer}>
      <SideBar />
      <div className={styles.productNavContainer}>
        <div className={styles.productUrl}>
          {/* top navigation link */}
          <Link href="/">home</Link>/<Link href="/products">products</Link>/
          <Link as={`/products/${category}`} href="/products/[category]">
            {category}
          </Link>
          /
          <Link
            href="/products/[category]/[subcategory]"
            as={`/products/${category}/${subcategory}`}
          >
            {subcategory}
          </Link>
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

      {/* displaying data to page of products awailable in subcategory in database */}
      {subCategoryProduct.length > 0 && (
        <div className={styles.categoryOuterContainer}>
          <h2>
            products found for {category} {subcategory}
          </h2>
          <div className={styles.categoryContainer}>
            {subCategoryProduct.map((product, idx) => (
              <SmProduct key={idx} product={product} />
            ))}
          </div>

          {/* for loading more result  */}
          <button
            className={styles.button + " bg_gradient"}
            onClick={async () => {
              await fetch(`${IP}/api/product/${category}`, {
                count: count.subcategory,
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.data !== "not-found") {
                    setSubCategoryProduct([...data.data]);
                    setCount({ ...count, subcategory: count.subcategory + 10 });
                  } else {
                    setSubCategoryProduct([]);
                  }
                });
            }}
          >
            Load More
          </button>
        </div>
      )}

      {/* displaying data to page of products awailable in category in database */}
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
              await fetch(`${IP}/api/product/${category}`, {
                count: count.category,
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.data !== "not-found") {
                    setcategoryProduct([...data.data]);
                    setCount({ ...count, subcategory: count.subcategory + 10 });
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

// generating props for loading data of the page on server
export async function getServerSideProps(ctx) {
  const IP2 = process.env.BACKEND_IP;
  const { category, subcategory } = ctx.query;
  console.log(`getServerSideProps`, category, subcategory);
  // define props object to usee
  var propData = {
    categoryProducts: [],
    subCategoryProducts: [],
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

    // fetching product details from subcategory
    await fetch(`${IP2}/api/product/${category}/${subcategory}`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, subCategoryProducts: [...data.data] })
          : propData;
      });
    return { props: propData };
  } catch (e) {
    // error occured while fetching data
    console.log("error from category page : ", e);
    return { props: propData };
  }
}

export default Subcategory;
