const mongoose = require("mongoose");

const data = {
  userId: { type: mongoose.Types.ObjectId, required: true },
  userPassword: { type: mongoose.Types.ObjectId, required: true },
};

const userPasswordSchema = new mongoose.Schema(data);

module.exports = mongoose.model("userPassword", userPasswordSchema);
