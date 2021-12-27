// allowing env variables
require("dotenv").config();
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { User } = require("../../auth/database/mongoModels");

router.get("/", async (req, res) => {});
router.post("/:product", async (req, res) => {});
router.put("/:product", async (req, res) => {});
router.delete("/:product", async (req, res) => {});

module.exports = router;
