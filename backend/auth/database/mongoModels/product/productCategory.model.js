const mongoose = require("mongoose");

const data = {
  productId: { type: mongoose.Types.ObjectId, required: true },
  category: { type: String, required: true },
};

const productCategorySchema = new mongoose.Schema(data);

module.exports = mongoose.model("productCategory", productCategorySchema);
