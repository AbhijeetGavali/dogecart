// allowing env variables
require("dotenv").config();
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;

const Store = require("../../auth/database/mongoModels/store/store.model");
const User = require("../../auth/database/mongoModels/user/user.model");
const StorePassword = require("../../auth/database/mongoModels/store/storePassword.model");

router.post(
  "/",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      let userId = user._id;
      let store = await Store.findOne({ userId });
      if (!store) {
        success = false;
        return res.status(400).json({ error: "user does not own any store" });
      }
      var storeId = store._id;
      const storePass = await StorePassword.findOne({ userId, storeId });
      const passwordCompare = await bcrypt.compare(
        password,
        storePass.password
      );

      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        store: {
          id: store.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
