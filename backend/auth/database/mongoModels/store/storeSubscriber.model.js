const mongoose = require("mongoose");

const data = {
  storeId: { type: mongoose.Types.ObjectId, required: true },
  userList: [{ type: String }],
};

const subscribersSchema = new mongoose.Schema(data);

module.exports = mongoose.model("subscribers", subscribersSchema);
