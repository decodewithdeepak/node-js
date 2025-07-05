const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (require authentication)
router.post('/create', requireAuth, blogController.createBlog);
router.post('/edit/:id', requireAuth, blogController.updateBlog);
router.get('/delete/:id', requireAuth, blogController.deleteBlog);

// Like route
router.post('/like/:id', requireAuth, blogController.likeBlog);

module.exports = router;
