const express = require('express');
const ContactController = require('../controllers/contactController');

const setContactRoutes = (app) => {
    const router = express.Router();
    const contactController = new ContactController();

    router.post('/contact', contactController.submitContactForm.bind(contactController));

    app.use('/api', router);
};

module.exports = setContactRoutes;