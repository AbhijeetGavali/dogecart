const mongoose = require("mongoose");

const data = {
  productId: { type: mongoose.Types.ObjectId, required: true },
  companyId: { type: mongoose.Types.ObjectId, required: true },
};

const productCompanySchema = new mongoose.Schema(data);

module.exports = mongoose.model("productCompany", productCompanySchema);
