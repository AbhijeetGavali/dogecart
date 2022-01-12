// allowing env variables
require("dotenv").config();
// importing router to set api paths
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

// auth verification jwt import
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;

var fetchuser = require("../middleware/fetchuser");
var fetchStore = require("../middleware/fetchStore");

const Store = require("../../auth/database/mongoModels/store/store.model");
const StorePassword = require("../../auth/database/mongoModels/store/storePassword.model");
const StoreSubscription = require("../../auth/database/mongoModels/store/storeSubscriber.model");

// GET =>  /api/store/:id : geting details of a store
router.get("/:id", async (req, res) => {
  try {
    let storeId = req.params.id;
    const store = await Store.findById(storeId);
    let data = store
      ? {
          posterUrls: store.posterUrl.map((url) => url),
          storeName: store.storeName,
          email: store.storeContactDetails.email,
          mobile: store.storeContactDetails.mobile,
          privacyPolacy: store.privacyPolacy.map((privacy) => {
            return { title: privacy.heading, description: privacy.detail };
          }),
          refundPolacy: store.refundPolacy.map((polacy) => {
            return { title: polacy.heading, description: polacy.detail };
          }),
        }
      : "Not Found";
    return res.send(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// POST =>  /api/store/ : creating a new store
router.post(
  "/",
  fetchuser,
  [
    body("posterUrl", "Poster is necessary").isArray().isLength({ min: 1 }),
    body("storeName", "Give a name to your store!").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("mobile", "You should have a mobile no for contact").isLength({
      min: 8,
    }),
    body("privacyPolacy", "you should give privacy policy")
      .isArray()
      .contains(),
    body("refundPolacy", "you should give refund policy").isArray().contains(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        check: "refund and privacy policy, posturls should be array",
      });
    }

    // If there are no error in req, perform next
    try {
      // Check whether the user with this email exists already
      let store = await Store.findOne({ userEmail: req.body.email });
      if (store) {
        return res
          .status(400)
          .json({ error: "Sorry, user with this email already owns a store" });
      }

      // Create a new user
      store = await Store.create({
        posterUrl: req.body.posterUrl.map((url) => url),
        storeName: req.body.storeName,
        storeContactDetails: {
          email: req.body.email,
          mobile: req.body.mobile,
        },
        privacyPolacy: req.body.privacyPolacy.map((privacy) => {
          return { heading: privacy.title, detail: privacy.description };
        }),
        refundPolacy: req.body.refundPolacy.map((polacy) => {
          return { heading: polacy.title, detail: polacy.description };
        }),
      });

      var storeId = store.id;
      var userId = req.user.id;

      // generationg password for storing in db
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      await StorePassword.create({
        storeId,
        userId,
        password: securePassword,
      });

      await StoreSubscription.create({
        storeId,
        userList: [],
      });

      // set data with user id
      const data = {
        store: {
          id: storeId,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // send token to clientside
      return res.status(200).json({ authtoken });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// PUT ⇒ /api/store/ : updating an existing store
router.put(
  "/",
  fetchuser,
  fetchStore,
  [
    body("posterUrl", "Poster is necessary").isArray().isLength({ min: 1 }),
    body("storeName", "Give a name to your store!").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("mobile", "You should have a mobile no for contact").isLength({
      min: 8,
    }),
    body("privacyPolacy", "you should give privacy policy")
      .isArray()
      .contains(),
    body("refundPolacy", "you should give refund policy").isArray().contains(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no error in req, perform next
    try {
      let StoreId = req.store.id;
      let done = await Store.findByIdAndUpdate(StoreId, {
        posterUrl: req.body.posterUrl.map((url) => url),
        storeName: req.body.storeName,
        storeContactDetails: {
          email: req.body.email,
          mobile: req.body.mobile,
        },
        privacyPolacy: req.body.privacyPolacy.map((privacy) => {
          return { heading: privacy.title, detail: privacy.description };
        }),
        refundPolacy: req.body.refundPolacy.map((polacy) => {
          return { heading: polacy.title, detail: polacy.description };
        }),
      });
      return done ? res.send("Done") : res.send("Not FOund");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// DELETE ⇒ /api/store : deleting and existing store
router.delete(
  "/",
  [body("password", "Password cannot be blank").exists()],
  fetchuser,
  fetchStore,
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no error in req, perform next
    try {
      let userId = req.user.id;
      let storeId = req.store.id;
      const { password } = req.body;

      const storePass = await StorePassword.findOne({ userId, storeId });
      if (storePass === null) {
        return res.status(400).send("pass null");
      }
      const passwordCompare = await bcrypt.compare(
        password,
        storePass.password
      );

      if (!passwordCompare) {
        return res.status(400).json({
          error: "incorrect credentials",
        });
      }
      await Store.findByIdAndDelete(storeId);
      await StorePassword.findByIdAndDelete(storePass._id);
      await StoreSubscription.findOneAndDelete({ storeId });
      return res.status(200).send("Done");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// exporting the module
module.exports = router;
