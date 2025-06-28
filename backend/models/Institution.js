const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    address: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Institution", institutionSchema);
