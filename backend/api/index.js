// importing router to set api paths
const router = require("express").Router();

// router.use("/account/users", require("./account"));
// router.use("/store", require("./store"));
router.use("/product", require("./product"));

// api for adding details direct to DB
// router.use("/details", require("./details"));

// exporting the module
module.exports = router;
