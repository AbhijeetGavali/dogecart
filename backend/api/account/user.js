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
const {
  User,
  UserPassword,
  UserDetails,
  UserCart,
  UserBucketList,
} = require("../../auth/database/mongoModels");

router.get("/", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// POST =>  /api/account/users/ : creating a new user
router.post(
  "/",
  [
    body("first_Name", "Enter a valid name").isLength({ min: 3 }),
    body("last_Name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no error in req, perform next
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ userEmail: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      // Create a new user
      user = await User.create({
        userName: {
          userFirstName: req.body.first_Name,
          userLastName: req.body.last_Name,
        },
        userEmail: req.body.email,
      });

      var userId = user.id;
      // generationg password for storing in db
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      await UserPassword.create({
        userId,
        userPassword: securePassword,
      });
      await UserDetails.create({
        userId,
        street: {
          userAddress1: "",
          userAddress2: "",
        },
        userCity: "",
        userState: "",
        userCountry: "",
        userPinCode: "",
        userContactNumber: -1,
      });
      await UserCart.create({
        userId,
        cart: [],
      });
      await UserBucketList.create({
        userId,
        bucket: [],
      });

      // set data with user id
      const data = {
        user: {
          id: userId,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // send token to clientside
      res.status(200).json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// PUT ⇒ /api/account/users/ : updating an existing user
router.put(
  "/",
  [
    body("first_Name", "Enter a valid name").isLength({ min: 3 }),
    body("last_Name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  fetchuser,
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no error in req, perform next
    try {
      let userId = req.user.id;
      const user = await User.findOneAndUpdate(
        { userId },
        {
          userName: {
            userFirstName: req.body.first_Name,
            userLastName: req.body.last_Name,
          },
          userEmail: req.body.email,
        }
      );
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// DELETE ⇒ /api/account/users/ : deleting and existing user
router.delete(
  "/",
  [body("password", "Password cannot be blank").exists()],
  fetchuser,
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no error in req, perform next

    try {
      let userId = req.user.id;
      const { password } = req.body;

      const userPass = await UserPassword.findOne({ userId });
      const passwordCompare = await bcrypt.compare(password, userPass.password);

      if (!passwordCompare) {
        return res.status(400).json({
          error: "incorrect credentials",
        });
      }
      await User.findByIdAndDelete(userId);
      await UserPassword.findByIdAndDelete(userPass.id);
      await UserDetails.findOneAndDelete({ userId });
      await UserCart.findOneAndDelete({ userId });
      await UserBucketList.findOneAndDelete({ userId });
      return res.status(200).send("Done");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// exporting the module
module.exports = router;
