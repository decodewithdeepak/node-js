const express = require('express');
const { register, login, getUsers } = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Get all users (for testing)
router.get('/users', getUsers);

module.exports = router;
