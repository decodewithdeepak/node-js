const express = require('express');
const { register, login, getUsers, upgradeToPremium, getFreeContent, getPremiumContent } = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Get all users (for testing)
router.get('/users', getUsers);

// Upgrade to Premium (POST - modifying data)
router.post('/upgrade', upgradeToPremium);

// Free User Content (GET - retrieving data)
router.get('/free-content/:username', getFreeContent);

// Premium User Content (GET - retrieving data)
router.get('/premium-content/:username', getPremiumContent);

module.exports = router;
