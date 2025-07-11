const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
{
  subtype: {
    type: String,
    enum: ["Assignment", "Quiz"],
    required: true,
  },
  submittedAgainst: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "subtype", // dynamic reference to either Assignment or Quiz model
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String, // URL, text, etc.
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  marksAwarded: { type: Number, default: 0 },
},
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);