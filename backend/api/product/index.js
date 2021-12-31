// importing router to set api paths
const router = require("express").Router();

router.use("/", require("./product"));
// router.use("/search", require("./search"));
router.use("/store", require("./store"));

// exporting the module
module.exports = router;
