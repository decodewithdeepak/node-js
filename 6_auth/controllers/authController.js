const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register User
const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user object
        const user = new User({
            username,
            password: hashedPassword
        });

        // Save in database
        await user.save();
        res.json({ message: 'User registered successfully', role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login User
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        res.json({ message: 'Login successful', username: user.username, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        // const users = await User.find().select('-password'); // Don't show passwords
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Upgrade to Premium
const upgradeToPremium = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = 'premium';
        await user.save();

        res.json({ message: 'Upgraded to premium successfully', role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Free Content Access
const getFreeContent = async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ message: 'Username required' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: `Hello ${username}! This is free content available to all logged users!` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Premium Content Access
const getPremiumContent = async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ message: 'Username required' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'premium') {
            return res.status(403).json({ message: `Premium access required. Your role: ${user.role}` });
        }

        res.json({ message: `Hello ${username}! This is premium content only for premium users!` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    getUsers,
    upgradeToPremium,
    getFreeContent,
    getPremiumContent
};