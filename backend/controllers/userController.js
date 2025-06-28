const User = require("../models/User");

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "User profile fetched successfully",
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// @desc    Get all users (for coordinator dashboard)
// @route   GET /api/users
// @access  Private - Coordinator only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// @desc    Approve a user
// @route   PUT /api/users/:id/approve
// @access  Private - Coordinator only
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User approved", user });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// @desc    Reject a user
// @route   PUT /api/users/:id/reject
// @access  Private - Coordinator only
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
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
