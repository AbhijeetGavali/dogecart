const mongoose = require("mongoose");

const data = {
  productUrl: [{ type: String, required: true, trim: true }],
  productTitle: { type: String, required: true, trim: true },
  productDescription: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  like: { type: Number, required: true, trim: true },
  rating: {
    rate: { type: Number, required: true, trim: true },
    count: { type: Number, required: true, trim: true },
  },
  colors: [{ type: String }],
};

const productSchema = new mongoose.Schema(data);

module.exports = mongoose.model("product", productSchema);
