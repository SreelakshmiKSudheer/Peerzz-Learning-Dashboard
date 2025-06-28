const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    title: String,
    description: String,
    order: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);
