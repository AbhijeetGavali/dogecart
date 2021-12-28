const mongoose = require("mongoose");

const data = {
  countryName: { type: String, required: true },
  awailable: { type: Boolean, required: true },
};

const countryListSchema = new mongoose.Schema(data);

module.exports = mongoose.model("countyList", countryListSchema);
