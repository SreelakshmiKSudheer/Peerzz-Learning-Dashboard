const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    maxMarks: { type: Number, required: true },
    questions: { type: [String], required: true },
    resources: [
        {
          type: { type: String, enum: ["document", "link"], default: "document" },
          url: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
