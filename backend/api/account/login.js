// allowing env variables
require("dotenv").config();
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../../auth/database/mongoModels/user/user.model");

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
      let user = await User.findOne({ email }, "email password verify");
      if (!user) {
        return res
          .status(400)
          .json({ error: ["Please try to login with correct credentials"] });
      }
      if (!user.verify) {
        return res
          .status(400)
          .json({ error: ["Please verify your email first"] });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({
          error: ["Please try to login with correct credentials"],
        });
      }

      // to implement user product cart mearging

      const data = {
        user: {
          id: user.id,
        },
      };

      user = await User.findById(
        user.id,
        "email name shippingDetails cart wishlist order"
      );

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken, user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
