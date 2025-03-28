const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();


exports.register = asyncHandler(async (req, res) => {
    const { username, password, is_admin = false } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: "Username is already taken" });
    }

    const user = new User({ username, password, is_admin });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
});

exports.login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }
    if (!user.comparePassword(password)) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});