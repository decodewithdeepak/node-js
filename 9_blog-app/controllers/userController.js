const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate JWT token
const generateToken = (userId, username, email) => {
    return jwt.sign({
        id: userId,
        username: username,
        email: email
    }, JWT_SECRET, { expiresIn: '7d' });
};

// Register user
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.render('register', {
                error: 'User with this email or username already exists'
            });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = generateToken(user._id, user.username, user.email);
        res.cookie('token', token);
        res.redirect('/dashboard');
    } catch (error) {
        res.render('register', { error: error.message });
    }
};

// Login user
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.username, user.email);
        res.cookie('token', token);
        res.redirect('/dashboard');
    } catch (error) {
        res.render('login', { error: error.message });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
