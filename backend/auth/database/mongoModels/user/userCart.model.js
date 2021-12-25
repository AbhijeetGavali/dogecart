const mongoose = require("mongoose");

const data = {
  userId: { type: mongoose.Types.ObjectId, required: true },
  cart: [
    {
      productId: { type: mongoose.Types.ObjectId, required: true },
      count: { type: Number, required: true },
    },
  ],
};

const userCartSchema = new mongoose.Schema(data);

module.exports = mongoose.model("userCart", userCartSchema);
