const mongoose = require("mongoose");

const data = {
  countryId: { type: String, required: true },
  awailable: { type: Boolean, required: true },
  countryName: { type: String, required: true },
  countryCode: { type: String },
  stateList: [{ type: String }],
};

const countryDetailSchema = new mongoose.Schema(data);

module.exports = mongoose.model("countryDetail", countryDetailSchema);
