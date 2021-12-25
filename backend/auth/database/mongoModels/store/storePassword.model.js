const mongoose = require("mongoose");

const data = {
  storeId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  password: { type: String, required: true },
};

const storPasswordSchema = new mongoose.Schema(data);

module.exports = mongoose.model("storePassword", storPasswordSchema);
