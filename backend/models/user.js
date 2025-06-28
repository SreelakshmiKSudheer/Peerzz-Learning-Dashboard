const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["learner", "educator", "coordinator"], default: "learner" },
  designation: { type: String },
  institution: { type: String },
  institution_id: { type: String },
  profile_url: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

