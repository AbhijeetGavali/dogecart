// allowing env variables
require("dotenv").config();
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;

var fetchuser = require("../middleware/fetchuser");
const { User } = require("../../auth/database/mongoModels");

router.put("/:email", async (req, res) => {});
router.patch("/:email", async (req, res) => {});

module.exports = router;