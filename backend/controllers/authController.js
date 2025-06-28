const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt');     // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');     // Import jsonwebtoken for token generation

const allowedRoles = ["learner", "educator"]; // Define allowed roles
// Register a new user
exports.register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        // Check if the role is allowed
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email})
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Try Login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
            role, // Store the user role
            status: "pending" // Default status is pending
        }); // Create a new user instance

        await newUser.save(); // Save the new user to the database

        res.status(201).json({ message: "User registered successfully. Waitning for approval" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({ message: "User not found. Please register" });
        }
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}