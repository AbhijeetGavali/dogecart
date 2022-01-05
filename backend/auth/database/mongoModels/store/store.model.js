const mongoose = require("mongoose");

const data = {
  owner: { type: mongoose.Types.ObjectId, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  admins: [
    {
      role: { type: String, required: true },
      user: { type: mongoose.Types.ObjectId, required: true },
      password: { type: String, required: true },
    },
  ],
  logo: { type: String },
  posterUrl: [{ type: String }],
  name: { type: String, required: true, trim: true },
  description: { type: String },
  subscribers: [
    { name: { type: String }, email: { type: String }, date: { type: Date } },
  ],
  affiliate: [
    {
      name: { type: String },
      email: { type: String },
      date: { type: Date },
      sales: { type: Number },
      product: [{ id: { type: String }, qut: { type: String } }],
      code: { type: String },
    },
  ],
  orders: [
    {
      date: { type: Date },
      cart: { type: Array },
      payment: { type: Boolean },
      promocod: { type: String },
      user: { name: { type: String }, email: { type: String } },
      payType: { type: String },
      ransactionId: { type: String },
      ammount: { type: Number },
      status: { type: String },
      date: { start: { type: String }, end: { type: String } },
    },
  ],
  ratings: [
    {
      rate: { type: Number, required: true },
      comment: { type: String },
      user: { type: mongoose.Types.ObjectId, required: true },
    },
  ],
  contactDetails: {
    email: { type: String, required: true, trim: true },
    mobile: { type: Number, required: true, trim: true },
    geoLocation: {
      lat: { type: String },
      lng: { type: String },
    },
  },
  faq: [{ que: { type: String }, ans: { type: String } }],
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
