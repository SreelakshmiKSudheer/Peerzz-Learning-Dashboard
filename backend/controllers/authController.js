const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Register user by role (learner or educator)
 * @route   POST /api/auth/register/:role
 * @access  Public
 */
exports.registerByRole = async (req, res) => {
  try {
    const { role } = req.params;
    let { name, email, password, designation, institution } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    // Remove the colon from the role parameter if present
    const cleanRole = role.replace(/^:/, "");
    if (!["learner", "educator"].includes(cleanRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (cleanRole === "educator") {
      if (!designation || !institution) {
        return res.status(400).json({ message: "Designation and institution are required for educators" });
      }
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let institutionId = undefined;
    if (cleanRole === "educator") {
      // Assuming you have an Institution model
      const Institution = require("../models/Institution");
      let institutionDoc = await Institution.findOne({ name: institution });
      if (!institutionDoc) {
        institutionDoc = await Institution.create({ name: institution });
      }
      institutionId = institutionDoc._id;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: cleanRole,
      status: "registered",
      designation: cleanRole === "educator" ? req.body.designation : undefined,
      institution: cleanRole === "educator" ? institutionId : undefined
    });

    // Create JWT token for the newly registered user
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        institutionId: cleanRole === "educator" ? institutionId : undefined 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return success response with token and user info
    res.status(201).json({ 
      message: `Registered successfully as ${cleanRole}`,
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        institutionId: cleanRole === "educator" ? institutionId : undefined
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin login using credentials from .env
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { userId: "peerzz_admin", role: "coordinator" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: { id: "peerzz_admin", name: "Peerzz Admin", role: "coordinator" }
      });
    }

    // Regular user login
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status === "banned") {
      return res.status(403).json({ message: "Account banned" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
exports.logout = (req, res) => {
  // In a stateless API, logout is typically handled on the client side
  // by removing the token from local storage or cookies.
  // Here we can just send a response indicating successful logout.
  res.status(200).json({ message: "Logout successful" });
};

// Sample JSON input for educator registration
// POST /api/auth/register/:educator
// Content-Type: application/json
/*
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securePassword123",
  "designation": "Assistant Professor",
  "institution": "ABC University"
}
*/