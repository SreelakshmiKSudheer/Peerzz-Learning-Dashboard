const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["learner", "educator"], 
    default: "learner" 
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  designation: { type: String },
  institution: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Institution" 
  },
  profile_url: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

