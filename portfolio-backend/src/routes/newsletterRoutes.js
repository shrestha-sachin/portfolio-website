const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// POST /api/newsletter
router.post('/newsletter', newsletterController.subscribe);

module.exports = router;