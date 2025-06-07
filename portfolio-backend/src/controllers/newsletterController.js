const emailService = require('../services/emailService');

class NewsletterController {
  async subscribe(req, res) {
    try {
      const { email } = req.body;
      
      if (!email || !email.includes('@')) {
        return res.status(400).json({ 
          errors: ['Please provide a valid email address'] 
        });
      }
      
      // Send confirmation email to subscriber
      await emailService.sendEmail(
        email,
        'Welcome to Sachin Shrestha\'s Newsletter',
        'Thank you for subscribing to my newsletter. You\'ll receive updates about my latest projects and tech insights.',
        `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2>Thanks for subscribing!</h2>
          <p>You're now part of my newsletter community. I'll keep you updated with my latest projects and tech insights.</p>
          <p>Best regards,<br>Sachin Shrestha</p>
        </div>`
      );
      
      // Send notification to yourself
      await emailService.sendEmail(
        process.env.ADMIN_EMAIL || 'sachinstha600@gmail.com',
        'New Newsletter Subscriber',
        `New subscriber: ${email}`,
        `<p>You have a new newsletter subscriber: ${email}</p>`
      );
      
      return res.status(200).json({ message: 'Thank you for subscribing to our newsletter!' });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return res.status(500).json({ errors: ['Failed to process your subscription. Please try again.'] });
    }
  }
}

module.exports = new NewsletterController();