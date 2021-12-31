// importing router to set api paths
const router = require("express").Router();
const Product = require("../../auth/database/mongoModels/product/product.model");
const ProductLikes = require("../../auth/database/mongoModels/product/productsLike.model");

var fetchuser = require("../middleware/fetchuser");

router.get("/:id", async (req, res) => {
  try {
    let productId = req.params.id;
    const product = await Product.findById(productId);
    if (!!product) {
      let data = product
        ? {
            id: product.id,
            productUrls: product.productUrl.map((url) => url),
            title: product.productTitle,
            description: product.productDescription,
            price: product.price,
            like: product.like,
            category: product.category,
            companyId: product.companyId,
            rateValue: product.rating.rate,
            rateCount: product.rating.count,
            availableColors: product.colors
              ? product.colors.map((col) => col)
              : [""],
          }
        : "Not Found";
      return res.json({ data });
    } else {
      return res.status(401).send("product not found");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// router.post(
//   "like/:id",
//   fetchuser,
//   [body("like", "Like should be +1 or -1").isNumeric()],
//   async (req, res) => {
//     var userId = req.user.id;
//     let productId = req.params.id;

//     let productLiked = ProductLikes.findOne({ userId });

//     if (!!productLiked) {
//       const product = await Product.findById(productId);
//       const productLiked = await Product.findByIdAndUpdate(productId, {
//         like: product.like + 1,
//       });
//       var liked = ProductLikes.create({
//         productId,
//         userId,
//       });
//       return res.status(200).json({ like: "liked", liked });
//     } else {
//       const product = await Product.findById(productId);
//       const productLiked = await Product.findByIdAndUpdate(productId, {
//         like: product.like - 1,
//       });
//       var liked = ProductLikes.findOneAndDelete({
//         productId,
//         userId,
//       });
//       return res.status(200).json({ like: "unliked", liked });
//     }
//   }
// );

// exporting the module
module.exports = router;
