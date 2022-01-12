// importing dependancies
import Link from "next/link";
import { useRouter } from "next/router";

// importing components, styles defined
import Product from "../../../../components/productDetails/product";
import SmProduct from "../../../../components/productDetails/smProduct";
import SideBar from "../../../../components/sideBar/SideBar";
import styles from "../../../../styles/productPage.module.css";

// main functional component
function ProductDetailPage({
  categoryProducts,
  subCategoryProducts,
  productDetails,
}) {
  // using router for geting query from url
  const router = useRouter();
  const { category, subcategory, productId } = router.query;

  // returning jsx element to client
  return (
    <div className={styles.productContainer}>
      <SideBar />
      <div className={styles.productUrl}>
        {/* top navigation link */}
        <Link href="/">home</Link>/<Link href="/products">products</Link>/
        <Link href="/products/[category]" as={`/products/${category}`}>
          {category}
        </Link>
        /
        <Link
          href="/products/[category]/[subcategory]"
          as={`/products/${category}/${subcategory}`}
        >
          {subcategory}
        </Link>
        /
        <Link
          href="/products/[category]/[subcategory]/[productId]"
          as={`/products/${category}/${subcategory}/${productId}`}
        >
          {`${productDetails.title}`}
        </Link>
      </div>

      {/* large product page sidplay  */}
      <div className={styles.productDetailsPage}>
        {" "}
        {productDetails && <Product product={productDetails} />}
      </div>

      {/* displaying data to page of products awailable in subcategory in database */}
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

      {/* displaying data to page of products awailable in category in database */}
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

export async function getServerSideProps(ctx) {
  const IP2 = process.env.BACKEND_IP;
  const { category, subcategory, productId } = ctx.query;

  // fetching product details from category
  var propData = {
    categoryProducts: [],
    subCategoryProducts: [],
    productDetails: {},
  };
  try {
    // getting products for category
    await fetch(`${IP2}/api/product/${category}`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, categoryProducts: [...data.data] })
          : propData;
      });

    // getting products for sub category
    await fetch(`${IP2}/api/product/${category}/${subcategory}`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, subCategoryProducts: [...data.data] })
          : propData;
      });

    // getting product details
    await fetch(`${IP2}/api/product/${category}/${subcategory}/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, productDetails: data.data })
          : propData;
      });
    return { props: propData };
  } catch (e) {
    console.log(e);
    return { props: propData };
  }
}

export default ProductDetailPage;
