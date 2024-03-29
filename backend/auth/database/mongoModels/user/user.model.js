const mongoose = require("mongoose");

const data = {
  name: {
    userFirstName: {
      type: String,
      required: true,
    },
    userLastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  verify: { type: Boolean, default: false },
  password: { type: String, required: true },
  shippingDetails: {
    street: {
      address1: { type: String },
      address1: { type: String },
    },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    geoLocation: {
      lat: { type: String },
      lng: { type: String },
    },
  },
  mobile: { type: Number },
  cart: { type: Array },
  wishlist: { type: Array },
  order: [
    {
      id: { type: String },
      product: { type: Array },
      totalAmmount: { type: Number },
      promoCode: { type: String },
      date: { type: String },
      tracker: { type: Object },
    },
  ],
  ratedProduct: { type: Array },
  refferal: { type: Array },
};

const userSchema = new mongoose.Schema(data);

module.exports = mongoose.model("user", userSchema);
