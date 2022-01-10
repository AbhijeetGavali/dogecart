// importing router to set api paths
const router = require("express").Router();
const Product = require("../../auth/database/mongoModels/product/product.model");
const Store = require("../../auth/database/mongoModels/store/store.model");
const User = require("../../auth/database/mongoModels/user/user.model");

// get => /api/product/:category get some details of all product with sub category
router.get("/:category", async (req, res) => {
  try {
    let category = req.params.category;

    const product = await Product.find(
      { category },
      "productUrl title description price manufacturar rating category subCategory"
    );

    let data =
      product.length > 0
        ? product.map((product) => {
            let store = Store.find(
              { _id: product.manufacturar },
              "name description logo"
            ).then((data) => data);
            return {
              id: product.id,
              productUrl: product.productUrl[0],
              title: product.productTitle,
              price: product.price,
              manufacturar: {
                name: store.name,
                description: store.description,
                logo: store.logo,
              },
              category: product.category,
              subCategory: product.subCategory,
              review: product.review.map((review) => {
                return {
                  ...review,
                  name: User.findById(review.userId, "name").then(
                    (name) => name
                  ),
                };
              }),
              description: product.description,
            };
          })
        : "not-found";
    return res.json({ data });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// get => /api/product/:category/:subcategory get some details of all product with sub category
router.get("/:category/:subcategory", async (req, res) => {
  try {
    let category = req.params.category;
    let subCategory = req.params.subcategory;

    const product = await Product.find(
      { category, subCategory },
      "productUrl title description price manufacturar rating category subCategory"
    );

    let data =
      product.length > 0
        ? product.map((product) => {
            let store = Store.find(
              { _id: product.manufacturar },
              "name description logo"
            ).then((data) => data);
            return {
              id: product.id,
              productUrl: product.productUrl[0],
              title: product.productTitle,
              price: product.price,
              manufacturar: {
                name: store.name,
                description: store.description,
                logo: store.logo,
              },
              category: product.category,
              subCategory: product.subCategory,
              review: product.review.map((review) => {
                return {
                  ...review,
                  name: User.findById(review.userId, "name").then(
                    (name) => name
                  ),
                };
              }),
              description: product.description,
            };
          })
        : "not-found";
    return res.json({ data });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// get => /api/product/:category/:subcategory/:productId get all details of single product
router.get("/:category/:subcategory/:productId", async (req, res) => {
  try {
    let productId = req.params.productId;
    const product = await Product.findById(productId, "-tax -promocode -order");
    const store = await Store.find(
      { _id: product.manufacturar },
      "name description logo"
    );

    let data = product
      ? {
          ...product,
          manufacturar: {
            id: store.id,
            name: store.name,
            description: store.description,
            logo: store.logo,
          },
          review: product.review.map((review) => {
            return {
              ...review,
              name: User.findById(review.userId, "name").then((name) => name),
            };
          }),
        }
      : "not-found";
    return res.json({ data });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// exporting the module
module.exports = router;
