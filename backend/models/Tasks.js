const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["assignment", "quiz"] },
    title: String,
    description: String,
    deadline: Date,
    maxMarks: Number,
    questions: [String] // can be improved if quiz requires options/answers
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
