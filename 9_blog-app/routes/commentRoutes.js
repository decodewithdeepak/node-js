const express = require('express');
const commentController = require('../controllers/commentController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Comment routes (all require authentication)
router.post('/:id', requireAuth, commentController.addComment);
router.get('/delete/:blogId/:commentId', requireAuth, commentController.deleteComment);

module.exports = router;
