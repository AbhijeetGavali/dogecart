const mongoose = require("mongoose");

const data = {
  userId: { type: mongoose.Types.ObjectId, required: true },
  bucket: [
    {
      productId: { type: mongoose.Types.ObjectId, required: true },
      count: { type: Number, required: true },
    },
  ],
};

const userBucketListSchema = new mongoose.Schema(data);

module.exports = mongoose.model("userBucketList", userBucketListSchema);
