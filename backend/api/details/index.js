// importing router to set api paths
const router = require("express").Router();

router.get("/addCountryList", require("./addCountryList"));
router.get("/addCountryDetails", require("./addCountryDetails"));

// exporting the module
module.exports = router;
