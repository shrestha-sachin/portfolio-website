const emailService = require('../services/emailService');

class ContactController {
    async submitContactForm(req, res) {
        try {
            const { name, email, message, time, subject } = req.body;

            // Validate input data
            const validationErrors = this.validateInput(name, email, message);
            if (validationErrors.length > 0) {
                return res.status(400).json({ errors: validationErrors });
            }

            // Send email using the email service - updated to match emailService implementation
            await emailService.sendEmail(
                process.env.CONTACT_EMAIL || 'sachinstha600@gmail.com',
                subject || 'New Contact Form Submission',
                `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nTime: ${time}`,
                `<div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Time:</strong> ${time || new Date().toLocaleString()}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>`
            );

            return res.status(200).json({ message: 'Your message has been sent successfully!' });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            return res.status(500).json({ message: 'An error occurred while sending your message. Please try again later.' });
        }
    }

    validateInput(name, email, message) {
        const errors = [];
        if (!name || name.trim() === '') {
            errors.push('Name is required.');
        }
        if (!email || !this.isValidEmail(email)) {
            errors.push('A valid email is required.');
        }
        if (!message || message.trim() === '') {
            errors.push('Message is required.');
        }
        return errors;
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

module.exports = new ContactController();