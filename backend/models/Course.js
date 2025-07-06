const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    domain: {type: String, required: true},
    tags: {type: [String], required: true},
    type: { type: String, enum: ["self-paced", "live"], default: "self-paced", required: true },
    duration: String,
    status: { type: String, enum: ["draft", "active", "archived"], default: "draft" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    startDate: Date,
    endDate: Date,
    fee: { type: Number, default: 0, required: true }, // 0 for free courses
    currency: { type: String, default: "USD" },
    image: String,
    language: { type: String, default: "English", required: true },
    prerequisites: { type: [String], required: true },
    syllabus: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        resources: [
          {
            type: { type: String, enum: ["video", "document", "link"], default: "video" },
            url: String,
            description: { type: String, required: true },
          },
        ],
      },
    ],
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true }], // Array of Module IDs
    certifications: {
      type: { type: String, enum: ["certificate", "diploma"], default: "certificate", required: true },
      provider: { type: String, required: true },
      validity: { type: Number, default: 12 }, // in months
    },
    prerequisitesMet: { type: Boolean, default: false },
    completionCriteria: {
      type: { type: String, enum: ["percentage", "points"], default: "percentage", required: true },
      value: { type: Number, default: 70 }, // e.g., 70% or 100 points
    },
    announcements: [
      {
        title: String,
        content: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    discussions: [
      {
        topic: String,
        posts: [
          {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: String,
            createdAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
    assignments: [{type: mongoose.Schema.Types.ObjectId, ref: "Assignment"}], // Array of Assignment IDs
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }], // Array of Quiz IDs
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    views: { type: Number, default: 0 },
    enrollments: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
