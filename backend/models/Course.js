const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    domain: String,
    tags: [String],
    type: { type: String, enum: ["self-paced", "live"], default: "self-paced" },
    duration: String,
    status: { type: String, enum: ["draft", "active", "archived"], default: "draft" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    startDate: Date,
    endDate: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
