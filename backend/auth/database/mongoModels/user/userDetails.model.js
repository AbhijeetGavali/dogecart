const mongoose = require("mongoose");

const data = {
  userId: { type: mongoose.Types.ObjectId, required: true },
  street: {
    userAddress1: { type: String, required: true, trim: true },
    userAddress2: { type: String, required: true, trim: true },
  },
  userCity: { type: String, required: true, trim: true },
  userState: { type: String, required: true, trim: true },
  userCountry: { type: String, required: true, trim: true },
  userPinCode: { type: Number, required: true, trim: true },
  userContactNumber: { type: Number, required: true, trim: true },
};

const userDetailSchema = new mongoose.Schema(data);

module.exports = mongoose.model("userDetail", userDetailSchema);
