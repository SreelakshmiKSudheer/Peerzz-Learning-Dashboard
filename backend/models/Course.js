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
    endDate: Date,
    fee: { type: Number, default: 0 },
    image: String,
    language: { type: String, default: "English" },
    prerequisites: [String],
    syllabus: [
      {
        title: String,
        description: String,
        resources: [
          {
            type: { type: String, enum: ["video", "document", "link"], default: "video" },
            url: String,
            description: String,
          },
        ],
      },
    ],
    assignments: [{
      title: String,
      description: String,
      dueDate: Date,
      resources: [
        {
          type: { type: String, enum: ["document", "link"], default: "document" },
          url: String,
          description: String,
        },
      ],
    }],
    quizzes: [
      {
        title: String,
        description: String,
        questions: [
          {
            questionText: String,
            options: [String],
            correctAnswer: String,
            points: { type: Number, default: 1 },
          },
        ],
        totalMarks: { type: Number, default: 0 },
      },
    ],
    certifications: {
      type: { type: String, enum: ["certificate", "diploma"], default: "certificate" },
      provider: String,
      validity: { type: Number, default: 12 }, // in months
    },
    prerequisitesMet: { type: Boolean, default: false },
    completionCriteria: {
      type: { type: String, enum: ["percentage", "points"], default: "percentage" },
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
    coursePath: {
      type: { type: String, enum: ["linear", "non-linear"], default: "linear" },
      steps: [
        {
          title: String,
          description: String,
          resources: [
            {
              type: { type: String, enum: ["video", "document", "link"], default: "video" },
              url: String,
              description: String,
            },
          ],
        },
      ],
    },
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
