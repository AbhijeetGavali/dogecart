// importing router to set api paths
const router = require("express").Router();

router.get("/", () => {
  console.log("Product");
});

// exporting the module
module.exports = router;
