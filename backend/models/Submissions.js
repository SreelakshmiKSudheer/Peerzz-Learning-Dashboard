const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String, // could be a file URL, text answer, etc.
    submittedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
