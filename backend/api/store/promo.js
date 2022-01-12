// allowing env variables
require("dotenv").config();
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const StorePromo = require("../../auth/database/mongoModels/store/storePromo.model");

router.get("/", async (req, res) => {
  const storeId = req.store.id;
  try {
    let promo = await StorePromo.findOne({ storeId });
    return res.status(200).json(promo);
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
});

router.get("/:prod", async (req, res) => {
  const storeId = req.store.id;
  try {
    let promo = await StorePromo.findOne({ storeId });
    return res.status(200).send(promo);
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
});

router.post(
  "/:id",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const storeId = req.store.id;
    const productId = req.params.id;
    const { coupan, value } = req.body;
    try {
      await StorePromo.create({
        storeId,
        productId,
        offer: {
          coupan,
          value,
        },
      });
      return res.send("Done");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.delete("/:email/:id", async (req, res) => {
  const { email, id } = req.params;
  if (!email) {
    return res.status(200).send("try again sending email");
  }
  try {
    let store = await StoreSubscription.findOne({ storeId: id });
    if (!store) {
      success = false;
      return res.status(400).json({ error: "Store not exist" });
    }
    var userList = store.userList;
    var userEmil = userList.indexOf(email);

    if (userEmil !== -1) {
      userList.splice(userEmil, 1);
      let newStore = await StoreSubscription.findOneAndUpdate(
        { storeId: id },
        { userList }
      );
    }
    return res.send("Done");
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
});

module.exports = router;
