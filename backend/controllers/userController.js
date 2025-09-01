const User = require("../models/User");
const Institution = require("../models/Institution");

// @desc    Get current user's profile
// @route   GET /api/user/me
// @access  Private
// http://localhost:3000/api/user/me
exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("institution", "name"); // populate institution name only
    if (!user) return res.status(404).json({ message: "User not found" });

    // Extract institution name if institution is populated
    const userObj = user.toObject();
    userObj.institutionName = userObj.institution?.name || null;

    res.status(200).json({ user: userObj });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc    Get all users (for coordinators)
// @route   GET /api/users
// @access  Private (Coordinator)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("institution", "name"); // populate institution name only

    // Add institutionName property to each user
    const usersWithInstitutionName = users.map(user => {
      const userObj = user.toObject();
      userObj.institutionName = userObj.institution?.name || null;
      return userObj;
    });

    res.status(200).json({ users: usersWithInstitutionName });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/user/:id
 * @access  Private (Coordinator)
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("institution", "name"); // populate institution name only

    if (!user) return res.status(404).json({ message: "User not found" });

    // Extract institution name if institution is populated
    const userObj = user.toObject();
    userObj.institutionName = userObj.institution?.name || null;

    res.status(200).json({ user: userObj });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc    Reject a user (by coordinator)
// @route   PUT /api/user/:id/reject
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


// @desc Get all users by role 
// @route GET /api/user/role/:role
// @access Private (Coordinator)
exports.getUserByRole = async (req, res) => {
  try{
    const role = req.params.role;
    const users = await User.find({ role }).select("-password");
    res.status(200).json({ users });
  }catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// @desc Get all users by status
// @route GET /api/user/status/:status
// @access Private (Coordinator)
exports.getUserByStatus = async (req, res) => {
  try{
    const status = req.params.status;
    const users = await User.find({ status}).select("-password");
    res.status(200).json({ users });
  }catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}


// @desc delete a user
// @route DELETE /api/user/:id
// @access Private (Coordinator)
exports.deleteUser = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) 
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  }catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// @desc Change password
// @route PUT /api/user/:id/change-password
// @access Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user || !(await user.matchPassword(currentPassword))) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};