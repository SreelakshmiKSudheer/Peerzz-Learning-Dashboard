const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    isRead: { type: Boolean, default: false },
    type: { type: String, enum: ["task", "announcement", "feedback", "reminder"] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
