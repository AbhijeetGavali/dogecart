// importing dependancies
import Link from "next/link";

// importing components, styles defined
import SmProduct from "../../components/productDetails/smProduct";
import SideBar from "../../components/sideBar/SideBar";
import styles from "../../styles/products.module.css";

function AllPRoducts({ allPRoducts }) {
  // define IP of backend to get data
  const IP = "http://localhost:5000";

  // returning jsx element to client
  return (
    <div className={styles.productContainer}>
      <SideBar />
      <div className={styles.productNavContainer}>
        <div className={styles.productUrl}>
          <Link href="/">home</Link>/<Link href="/products">products</Link>/
        </div>
        <select name="sort" id="sort" className={styles.sortOption}>
          <option default value="select">
            Select Filter
          </option>
          <option value="highRated">High Rated</option>
          <option value="Latest">New Posted</option>
        </select>
      </div>
      {allPRoducts.length > 0 && (
        <div className={styles.categoryOuterContainer}>
          <h2>Products we have </h2>
          <div className={styles.categoryContainer}>
            {allPRoducts.map((product, idx) => (
              <SmProduct key={idx} product={product} />
            ))}
          </div>
          <button>show more</button>
        </div>
      )}
    </div>
  );
}

// generating initial props for loading initial page on server
export async function getServerSideProps(ctx) {
  const IP2 = process.env.BACKEND_IP;

  // fetching all products awailable
  var propData = {
    allPRoducts: [],
  };
  try {
    await fetch(`${IP2}/api/product`)
      .then((response) => response.json())
      .then((data) => {
        data.data !== "not-found"
          ? (propData = { ...propData, allPRoducts: [...data.data] })
          : propData;
      });

    return { props: propData };
  } catch (e) {
    // error occured while fetching data
    console.log("error from category page : ", e);
    console.log(`url: ${IP2}/api/product`);
    console.log(propData);
    return { props: propData };
  }
}

export default AllPRoducts;
