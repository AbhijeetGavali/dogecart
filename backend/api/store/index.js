// importing router to set api paths
const router = require("express").Router();
var fetchuser = require("../middleware/fetchuser");
var fetchStore = require("../middleware/fetchStore");

router.use("/", require("./store"));
router.use("/login", fetchuser, require("./login"));
router.use("/reset-password", require("./resetPassword"));
router.use("/subscription", require("./subscription"));
// router.use("/:promo", fetchuser, fetchStore, require("./promo"));

// exporting the module
module.exports = router;
