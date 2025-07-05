const mongoose = require("mongoose");

// The profile_url field is intended to store the URL of the user's profile picture or page.
// Whether it is provided by the platform or the user depends on your application logic.
// If you want the platform to provide a default profile URL, you can set a default value here.

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
    enum: ["registered", "approved", "rejected"],
    default: "registered"
  },
  designation: { type: String },
  institution: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Institution" 
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

