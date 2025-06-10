const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact (note: '/api' is already prefixed in app.js)
router.post('/contact', contactController.submitContactForm.bind(contactController));

module.exports = router;