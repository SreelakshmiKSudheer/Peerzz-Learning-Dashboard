const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    submission: { type: mongoose.Schema.Types.ObjectId, ref: "Submission", required: true, unique: true },
    evaluatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    marksAwarded: { type: Number, required: true },
    feedback: { type: String },
    evaluatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
