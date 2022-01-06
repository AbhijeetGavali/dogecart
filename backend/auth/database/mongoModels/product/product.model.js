const mongoose = require("mongoose");

const data = {
  productUrl: [{ type: String, required: true, trim: true }],
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  tax: { type: Number },
  category: { type: String, required: true },
  subCategory: { type: String },
  manufacturar: { type: mongoose.Types.ObjectId, required: true },
  rating: {
    rate: { type: Number, required: true, trim: true },
    count: { type: Number, required: true, trim: true },
  },
  review: [
    {
      review: { type: Number, required: true, trim: true },
      comment: { type: Number, required: true, trim: true },
    },
  ],
  colors: [{ type: String }],
  stock: { type: Number, required: true },
  model: { type: Number },
  promocode: { type: Array },
  measurement: {
    size: { type: String },
    wait: { type: Number },
    unit: { type: String },
  },
  orders: { type: Number },
  refundAble: { type: Boolean, required: true },
  digital: { type: Boolean, required: true },
  downloadLink: { type: File },
  faq: [{ que: { type: String }, ans: { type: String } }],
};

const productSchema = new mongoose.Schema(data);

module.exports = mongoose.model("product", productSchema);
