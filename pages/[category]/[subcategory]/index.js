import Link from "next/link";
import { useRouter } from "next/router";
import SmProduct from "../../../components/productDetails/smProduct";
import styles from "../../../styles/subCatrgoryProductPage.module.css";

function Subcategory({ categoryProducts, subCategoryProducts }) {
  const router = useRouter();
  const { category, subcategory } = router.query;
  return (
    <div className={styles.productContainer}>
      <div className={styles.productUrl}>
        <Link href="/">home</Link>/<Link href="/products">products</Link>/
        <Link href={`/${category}`}>{category}</Link>/
        <Link href={`/${category}/${subcategory}`}>{subcategory}</Link>
      </div>
      <select name="sort" id="sort" className={styles.sortOption}>
        <option default value="select">
          Select Filter
        </option>
        <option value="highRated">High Rated</option>
        <option value="Latest">New Posted</option>
      </select>
      {subCategoryProducts.length > 0 && (
        <div className={styles.categoryOuterContainer}>
          <h2>simmilar products for {subcategory}</h2>
          <div className={styles.categoryContainer}>
            {subCategoryProducts.map((product, idx) => (
              <SmProduct key={idx} product={product} />
            ))}
          </div>
          <button>show more</button>
        </div>
      )}
      {categoryProducts.length > 0 && (
        <div className={styles.categoryOuterContainer}>
          <h2>simmilar products for {category}</h2>
          <div className={styles.categoryContainer}>
            {categoryProducts.map((product, idx) => (
              <SmProduct key={idx} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Subcategory.getInitialProps = async (ctx) => {
  const IP = process.env.IP;
  const { category, subcategory } = ctx.query;

  // fetching product details from category
  var propData = {
    categoryProducts: [],
    subCategoryProducts: [],
  };
  try {
    await fetch(`${IP}/api/product/${category}`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, categoryProducts: [...data.data] })
          : propData;
      });

    await fetch(`${IP}/api/product/${category}/${subcategory}`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, categoryProducts: [...data.data] })
          : propData;
      });
    return propData;
  } catch (e) {
    console.log(e);
    // remove befor production
    return {
      categoryProducts: data,
      subCategoryProducts: data,
    };
  }
};

export default Subcategory;
