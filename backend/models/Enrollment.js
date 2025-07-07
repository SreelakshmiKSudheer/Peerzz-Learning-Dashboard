const mongoose = require("mongoose");
const User = require("./User");
const Course = require("./Course");

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  dateEnrolled: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["enrolled", "completed", "dropped", "rejected"],
        default: "enrolled",
    },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);