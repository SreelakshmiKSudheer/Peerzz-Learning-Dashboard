const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    title: {type: String, required: true},
    description: {type: String, required: true},
    order: {type: Number, required: true},
    file: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);
