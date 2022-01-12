// allowing env variables
require("dotenv").config();
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const path = require("path");

const StoreSubscription = require("../../auth/database/mongoModels/store/storeSubscriber.model");

const fetchusers = require("../middleware/fetchuser");
const fetchStore = require("../middleware/fetchStore");

router.get("/subscribers", fetchusers, fetchStore, async (req, res) => {
  const userId = req.store.id;
  const storeId = req.store.id;
  try {
    let storeSubList = await StoreSubscription.findOne({ storeId, userId });
    return res.status(200).send(storeSubList.userList);
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
});

router.get("/:email/:id", async (req, res) => {
  const { email, id } = req.params;
  if (!email) {
    return res.status(200).send("try again sending email");
  }
  try {
    return res.sendFile(path.join(__dirname, "../../static/unsubscribe/"));
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

    const { email } = req.body;
    const { id } = req.params;
    try {
      let store = await StoreSubscription.findOne({ storeId: id });
      if (!store) {
        success = false;
        return res.status(400).json({ error: "Store not exist" });
      }
      var userList = store.userList;
      var userEmil = userList.indexOf(email);

      if (userEmil == -1) {
        userList.push(email);
        let newStore = await StoreSubscription.findOneAndUpdate(
          { storeId: id },
          { userList }
        );
      }
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
