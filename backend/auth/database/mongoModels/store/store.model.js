const mongoose = require("mongoose");

const data = {
  posterUrl: [{ type: String, required: true, trim: true }],
  storeName: { type: String, required: true, trim: true },
  storeContactDetails: {
    email: { type: String, required: true, trim: true },
    mobile: { type: Number, required: true, trim: true },
  },
  privacyPolacy: [
    {
      heading: { type: String, required: true, trim: true },
      detail: { type: String, required: true, trim: true },
    },
  ],
  refundPolacy: [
    {
      heading: { type: String, required: true, trim: true },
      detail: { type: String, required: true, trim: true },
    },
  ],
};

const storeSchema = new mongoose.Schema(data);

module.exports = mongoose.model("store", storeSchema);
