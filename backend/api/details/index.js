// importing router to set api paths
const router = require("express").Router();

router.get("/addCountryList", require("./addCountryList"));

// exporting the module
module.exports = router;
