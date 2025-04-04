// [SECTION] Dependencies and Modules
const bcrypt = require('bcrypt');
const User = require("../models/User");
const auth = require("../auth");

// Utility function for error handling
const errorHandler = (error, res) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
};

// [CONTROLLER] Register a new user
module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check for existing email or username
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        if (existingUsername) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userId: `${Date.now()}-${Math.floor(Math.random() * 10000)}`, // basic unique ID
            email,
            username,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: { email: savedUser.email, username: savedUser.username } });
    } catch (error) {
        errorHandler(error, res);
    }
};

// [CONTROLLER] Login a user with email or username
module.exports.loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Check if identifier was provided
        if (!identifier || !password) {
            return res.status(400).json({ message: "Username/email and password are required" });
        }

        // Try finding the user by email or username
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "No user found with that email or username" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = auth.createAccessToken(user);
        res.status(200).json({ message: "Login successful", access: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// [CONTROLLER] View user profile (User)
module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        errorHandler(error, res);
    }
};

// [CONTROLLER] Reset user password (User)
module.exports.resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        errorHandler(error, res);
    }
};

// [CONTROLLER] Update user profile (User)
module.exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;

        // Prevent password or isAdmin updates here unless explicitly allowed
        if (updates.password || updates.isAdmin) {
            return res.status(400).json({ message: "You are not allowed to update password or admin status here" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        errorHandler(error, res);
    }
};
