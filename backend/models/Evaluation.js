const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    submission: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" },
    evaluatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    feedback: String,
    marks: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
