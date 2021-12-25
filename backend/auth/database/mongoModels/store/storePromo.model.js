const mongoose = require("mongoose");

const data = {
  storeID: { type: mongoose.Types.ObjectId, required: true },
  productId: { type: mongoose.Types.ObjectId, required: true },
  offer: {
    coupan: { type: String, required: true },
    value: { type: Number, required: true },
  },
};

const storePromoSchema = new mongoose.Schema(data);

module.exports = mongoose.model("storePromo", storePromoSchema);
