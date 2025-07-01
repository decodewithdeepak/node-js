const express = require('express');
const urlController = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', urlController.shortenUrl);
router.get('/:shortCode', urlController.redirectUrl);
router.get('/', urlController.getAllUrls);

module.exports = router;