const mongoose = require("mongoose");

const data = {
  countryId: { type: mongoose.Types.ObjectId, required: true },
  countryName: { type: String, required: true },
  countryCode: { type: String, required: true },
  stateList: [{ type: String, required: true }],
};

const countryDetailSchema = new mongoose.Schema(data);

module.exports = mongoose.model("countryDetail", countryDetailSchema);
