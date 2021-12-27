// importing router to set api paths
const router = require("express").Router();

router.use("/account/users", require("./account"));
router.use("/store", require("./store"));
router.use("/product", require("./product"));

// exporting the module
module.exports = router;
