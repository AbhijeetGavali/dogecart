// importing router to set api paths
const router = require("express").Router();

// importing mongooes modules from Database
const Product = require("../../auth/database/mongoModels/product/product.model");
const Store = require("../../auth/database/mongoModels/store/store.model");

// get => /api/product   :get all awailable products
router.get("/", async (req, res) => {
  try {
    const product = await Product.find(
      {},
      "productUrl title description price manufacturar review category subCategory"
    )
      .skip(req.body.count ? req.body.count : 0)
      .limit(req.body.count ? 10 : 30);

    // generate data to share with request
    let data =
      product.length > 0
        ? await Promise.all(
            product.map(async (product) => {
              // find manufacturar of the product
              var store = await Store.findOne(
                { _id: product.manufacturar },
                "name description logo"
              );

              // return the result
              return {
                id: product.id,
                productUrl: product.productUrl[0],
                title: product.title,
                price: product.price,
                manufacturar: {
                  id: store.id,
                  name: store.name,
                  description: store.description,
                  logo: store.logo,
                },
                category: product.category,
                subCategory: product.subCategory,
                review: product.review,
                description: product.description,
              };
            })
          )
        : "not-found";
    return res.json({ data });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// get => /api/product/autocomplete/:text   :get smart suggestion for your search
router.get("/autocomplete/:text", async (req, res) => {
  var text = req.params.text;
  try {
    let data = await Product.aggregate([
      {
        $search: {
          index: "searchProducts",
          autocomplete: {
            query: `${text}`,
            path: "title",
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          subCategory: 1,
        },
      },
    ]);
    let match = false;
    if (data.length > 0)
      if (data[0].title.toLowerCase().indexOf(text.toLowerCase()) === 0) {
        match = true;
      }

    return res.json({ data, match });
  } catch (error) {
    // error occur in the request api
    console.error(
      "Error while searching document for autocomplete : ",
      error.message
    );
    // console.error({ msg: "data : ", category, count: req.body.count });
    return res.status(500).send("Internal Server Error");
  }
});

// get => /api/product/search/:searchText   :get details of product on seach basis
router.get("/search/:searchText", async (req, res) => {
  var searchText = req.params.searchText;
  try {
    // searching query shearchTest in mongo db
    var data = await Product.aggregate([
      {
        $search: {
          index: "searchByText",
          text: {
            query: `${searchText}`,
            path: ["title", "description"],
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
      {
        $lookup: {
          from: "stores",
          localField: "manufacturar",
          foreignField: "_id",
          as: "manufacturar",
        },
      },
      {
        $project: {
          id: 1,
          productUrl: 1,
          title: 1,
          price: 1,
          "manufacturar._id": 1,
          "manufacturar.name": 1,
          "manufacturar.description": 1,
          "manufacturar.logo": 1,
          category: 1,
          subCategory: 1,
          review: 1,
          description: 1,
        },
      },
    ]);
    return res.json({
      data: data.map((product) => ({
        ...product,
        productUrl: product.productUrl[0],
        manufacturar: product.manufacturar[0],
      })),
    });
  } catch (error) {
    // error occur in the request api
    console.error("Error while searching for product : ", error.message);
    console.error({ msg: "data : ", searchText });
    return res.status(500).send("Internal Server Error");
  }
});

// get => /api/product/:category   :get some details of all product with sub category
router.get("/:category", async (req, res) => {
  let category = req.params.category;
  try {
    // find products with givin categories limit responce
    const product = await Product.find(
      { category },
      "productUrl title description price manufacturar review category subCategory"
    )
      .skip(req.body.count ? req.body.count : 0)
      .limit(req.body.count ? 10 : 30);

    // generate data to share with request
    let data =
      product.length > 0
        ? await Promise.all(
            product.map(async (product) => {
              // find manufacturar of the product
              var store = await Store.findOne(
                { _id: product.manufacturar },
                "name description logo"
              );

              // return the result
              return {
                id: product.id,
                productUrl: product.productUrl[0],
                title: product.title,
                price: product.price,
                manufacturar: {
                  id: store.id,
                  name: store.name,
                  description: store.description,
                  logo: store.logo,
                },
                category: product.category,
                subCategory: product.subCategory,
                review: product.review,
                description: product.description,
              };
            })
          )
        : "not-found";

    // console.log(data);
    return res.json({ data });
  } catch (error) {
    // error occur in the request api
    console.error("Error while getting categories : ", error.message);
    console.error({ msg: "data : ", category, count: req.body.count });
    return res.status(500).send("Internal Server Error");
  }
});

// get => /api/product/:category/:subcategory     :get some details of all product with sub category
router.get("/:category/:subcategory", async (req, res) => {
  let category = req.params.category;
  let subCategory = req.params.subcategory;
  try {
    // find products with givin categories limit responce
    const product = await Product.find(
      { category, subCategory },
      "productUrl title description price manufacturar review category subCategory"
    )
      .skip(req.body.count ? req.body.count : 0)
      .limit(req.body.count ? 10 : 30);

    // generate data to share with request
    let data =
      product.length > 0
        ? await Promise.all(
            product.map(async (product) => {
              // find manufacturar of the product
              var store = await Store.findOne(
                { _id: product.manufacturar },
                "name description logo"
              );

              // return the result
              return {
                id: product.id,
                productUrl: product.productUrl[0],
                title: product.title,
                price: product.price,
                manufacturar: {
                  id: store.id,
                  name: store.name,
                  description: store.description,
                  logo: store.logo,
                },
                category: product.category,
                subCategory: product.subCategory,
                review: product.review,
                description: product.description,
              };
            })
          )
        : "not-found";

    return res.json({ data });
  } catch (error) {
    // error occur in the request api
    console.error("Error while getting sub categories : ", error.message);
    console.error({
      msg: "data : ",
      category,
      subCategory,
      count: req.body.count,
    });
    return res.status(500).send("Internal Server Error");
  }
});

// get => /api/product/:category/:subcategory/:productId      :get all details of single product
router.get("/:category/:subcategory/:productId", async (req, res) => {
  try {
    let productId = req.params.productId;
    // find product details
    const product = await Product.findById(productId, "-tax -promocode -order");

    // find manufacturar details for the product
    const store = await Store.findOne(
      { _id: product.manufacturar },
      "name description logo"
    );

    // get required data
    let data = product
      ? {
          id: product.id,
          productUrl: product.productUrl,
          title: product.title,
          description: product.description,
          price: product.price,
          manufacturar: {
            id: store.id,
            name: store.name,
            description: store.description,
            logo: store.logo,
          },
          category: product.category,
          subCategory: product.subCategory,
          review: product.review,
          colors: product.colors,
          sizes: product.sizes,
          storeDiscount: product.storeDiscount,
          measurement: product.measurement,
          faq: product.faq,
        }
      : "not-found";

    // send responce data
    return res.json({ data });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// exporting the module
module.exports = router;
