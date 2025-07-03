const express = require('express');
const { register, login, getUsers, upgradeToPremium, getFreeContent, getPremiumContent } = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Get all users (for testing)
router.get('/users', getUsers);

// Upgrade to Premium
router.post('/upgrade', upgradeToPremium);

// Free User Content
router.post('/free-content', getFreeContent);

// Premium User Content
router.post('/premium-content', getPremiumContent);

module.exports = router;
