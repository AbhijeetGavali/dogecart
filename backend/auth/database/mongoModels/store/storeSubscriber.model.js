const mongoose = require("mongoose");

const data = {
  storeID: { type: mongoose.Types.ObjectId, required: true },
  userList: [{ type: mongoose.Types.ObjectId, required: true }],
};

const subscribersSchema = new mongoose.Schema(data);

module.exports = mongoose.model("subscribers", subscribersSchema);
