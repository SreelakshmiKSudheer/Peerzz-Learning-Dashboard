const User = require("../models/User");

// @desc    Get current user's profile
// @route   GET /api/user/me
// @access  Private
// http://localhost:3000/api/user/me
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc    Get all users (for coordinators)
// @route   GET /api/users
// @access  Private (Coordinator)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// @desc    Reject a user (by coordinator)
// @route   PUT /api/users/:id/reject
// @access  Private (Coordinator)
exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User rejected", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
