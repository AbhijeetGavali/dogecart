import Link from "next/link";
import { useRouter } from "next/router";
import SmProduct from "../../components/productDetails/smProduct";
import styles from "../../styles/subCatrgoryProductPage.module.css";

function Category({ categoryProducts }) {
  const router = useRouter();
  const { category } = router.query;
  return (
    <div className={styles.productContainer}>
      <div className={styles.productUrl}>
        <Link href="/">home</Link>/<Link href="/products">products</Link>/
        <Link href={`/${category}`}>{category}</Link>/
      </div>
      <select name="sort" id="sort" className={styles.sortOption}>
        <option default value="select">
          Select Filter
        </option>
        <option value="highRated">High Rated</option>
        <option value="Latest">New Posted</option>
      </select>
      {categoryProducts.length > 0 && (
        <div className={styles.categoryOuterContainer}>
          <h2>simmilar products for {category}</h2>
          <div className={styles.categoryContainer}>
            {categoryProducts.map((product, idx) => (
              <SmProduct key={idx} product={product} />
            ))}
          </div>
          <button>show more</button>
        </div>
      )}
    </div>
  );
}

Category.getInitialProps = async (ctx) => {
  const IP = process.env.IP;
  const { category } = ctx.query;

  // fetching product details from category
  var propData = {
    categoryProducts: [],
  };
  try {
    await fetch(`${IP}/api/product/${category}`)
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
    };
  }
};

export default Category;
