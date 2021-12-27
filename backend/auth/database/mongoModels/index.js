// exporting schema for product type data
module.exports = Product = require("./product/product.model");
module.path = require("./product/productRating.model");
module.path = require("./product/productsLike.model");

// export schema for store type data
module.path = require("./store/store.model");
module.path = require("./store/storePassword.model");
module.path = require("./store/storePromo.model");
module.path = require("./store/storeSubscriber.model");

// export schema for user type datas
module.exports = User = require("./user/user.model");
module.path = require("./user/userBucketList.model");
module.path = require("./user/userCart.model");
module.path = require("./user/userDetails.model");
module.path = require("./user/userPassword.model");

// export extra details
module.path = require("./details/contryDetails.model");
module.path = require("./details/countryList.model");
