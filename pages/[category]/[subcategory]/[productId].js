import Link from "next/link";
import { useRouter } from "next/router";
import Product from "../../../components/productDetails/product";
import SmProduct from "../../../components/productDetails/smProduct";
import styles from "../../../styles/productPage.module.css";
import { data } from "../../../data/product"; // remove befor production

function ProductDetailPage({
  categoryProducts,
  subCategoryProducts,
  productDetails,
}) {
  const router = useRouter();
  const { category, subcategory, productId } = router.query;
  return (
    <div className={styles.productContainer}>
      <div className={styles.productUrl}>
        <Link href="/">home</Link>/<Link href="/products">products</Link>/
        <Link href={`/${category}`}>{category}</Link>/
        <Link href={`/${category}/${subcategory}`}>{subcategory}</Link>/
        <Link href={`/${category}/${subcategory}/${productId}`}>
          {`${productDetails.title}`}
        </Link>
      </div>
      <div className={styles.productDetailsPage}>
        {" "}
        {productDetails && <Product product={productDetails} />}
      </div>
      {subCategoryProducts.length > 0 && (
        <div className={styles.categoryOuterContainer}>
          <h2>simmilar products for {subcategory}</h2>
          <div className={styles.categoryContainer}>
            {subCategoryProducts.map((product, idx) => (
              <SmProduct key={idx} product={product} />
            ))}
          </div>
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

ProductDetailPage.getInitialProps = async (ctx) => {
  const IP = process.env.IP;
  const { category, subcategory, productId } = ctx.query;

  // fetching product details from category
  var propData = {
    categoryProducts: [],
    subCategoryProducts: [],
    productDetails: {},
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

    await fetch(`${IP}/api/product/${category}/${subcategory}/${productId}`)
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
      productDetails: data[0],
    };
  }
};

export default ProductDetailPage;
