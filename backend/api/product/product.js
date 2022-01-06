// importing router to set api paths
const router = require("express").Router();
const Product = require("../../auth/database/mongoModels/product/product.model");

// get => /api/product/:category get some details of all product with sub category
router.get("/:category", async (req, res) => {
  try {
    let category = req.params.category;

    const product = await Product.find(
      { category },
      "productUrl title price manufacturar rating stock"
    );

    let data =
      product.length > 0
        ? product.map((product) => ({
            id: product.id,
            productUrl: product.productUrl[0],
            title: product.productTitle,
            price: product.price,
            manufacturar: product.manufacturar,
            rating: product.rating,
            stock: product.stock,
          }))
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
      "productUrl title price manufacturar rating stock"
    );

    let data =
      product.length > 0
        ? product.map((product) => ({
            id: product.id,
            productUrl: product.productUrl[0],
            title: product.productTitle,
            price: product.price,
            manufacturar: product.manufacturar,
            rating: product.rating,
            stock: product.stock,
          }))
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
    let data = product ? { ...product } : "not-found";
    return res.json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// exporting the module
module.exports = router;
