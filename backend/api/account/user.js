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

const User = require("../../auth/database/mongoModels/user/user.model");

// get details of user
router.get("/", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId, "name email");
    let data = user
      ? {
          firstName: user.name.userFirstName,
          lastName: user.name.userFirstName,
          email: user.email,
        }
      : "Not Found";
    return res.send(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(200).send("try again creating account");
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    let done = await User.findByIdAndUpdate(data.id, { verify: true });
    return done
      ? res.status(200).send("Thanks For verification")
      : res.send("Failed to verify your email");
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
});

// POST =>  /api/account/users/ : creating a new user
router.post(
  "/",
  [
    body("firstName", "Enter a valid name").isLength({ min: 3 }),
    body("lastName", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // If there are no error in req, perform next
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email }, "id email");
      if (user) {
        return res
          .status(400)
          .json({ error: ["Sorry a user with this email already exists"] });
      }

      // generationg password for storing in db
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: {
          userFirstName: req.body.firstName,
          userLastName: req.body.lastName,
        },
        email: req.body.email,
        password: securePassword,
      });

      // set data with user id
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      var userId = user.id;
      const mailVerificationDAta = {
        userId,
        email,
      };
      const mailVerificationToken = jwt.sign(mailVerificationDAta, JWT_SECRET, {
        expiresIn: 15 * 60,
      });

      // send mail to email with sub and pass reset email
      console.log(
        `http://${process.env.WEBSITEURL}/api/account/users/verify/${mailVerificationToken}`
      );

      var htmlData = `http://${process.env.WEBSITEURL}/api/account/users/verify/${mailVerificationToken}`;
      var props = {
        MAIL_TO: email,
        MAILER_SUBJECT: "Verify account on dogecart",
        MAILER_TEMPLATE: htmlData,
      };
      let responce = await mailer(props);

      // send token to clientside
      return res.status(200).json({ responce });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// PUT ⇒ /api/account/users/ : updating an existing user
router.put("/", fetchuser, async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If there are no error in req, perform next
  try {
    let userId = req.user.id;
    const user = await User.findOne(userId);
    var data = {
      name: {
        userFirstName: req.body.firstName
          ? req.body.firstName
          : user.name.userFirstName,
        userLastName: req.body.lastName
          ? req.body.lastName
          : user.name.userLastName,
      },
      shippingDetails: {
        street: {
          address1: req.body.address1
            ? req.body.address1
            : user.shippingDetails.street.address1,
          address1: req.body.address2
            ? req.body.address2
            : user.shippingDetails.street.address2,
        },
        city: req.body.city ? req.body.city : user.shippingDetails.city,
        state: req.body.state ? req.body.state : user.shippingDetails.state,
        country: req.body.country
          ? req.body.country
          : user.shippingDetails.country,
        pincode: req.body.pincode
          ? req.body.pincode
          : user.shippingDetails.pincode,
      },
    };
    let done = await User.findByIdAndUpdate(userId, data);
    return done ? res.send("Done") : res.send("Not FOund");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

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

      const userPass = await User.findOne({ userId }, "password");
      if (userPass === null) {
        return res.status(400).send("pass null");
      }
      const passwordCompare = await bcrypt.compare(password, userPass);

      if (!passwordCompare) {
        return res.status(400).json({
          error: "incorrect credentials",
        });
      }
      await User.findByIdAndDelete(userId);
      return res.status(200).send("Done");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// exporting the module
module.exports = router;
