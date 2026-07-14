import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data';

export default function Contact() {
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  useEffect(() => {
    // Check if we've returned from FormSubmit redirect
    if (sessionStorage.getItem('contactFormSubmitted')) {
      showToast('Message sent successfully!', 'success');
      sessionStorage.removeItem('contactFormSubmitted');
    }
    if (sessionStorage.getItem('newsletterFormSubmitted')) {
      showToast('Subscribed successfully!', 'success');
      sessionStorage.removeItem('newsletterFormSubmitted');
    }
  }, []);

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 5000);
  };

  const handleContactSubmit = () => {
    setIsSubmittingContact(true);
    sessionStorage.setItem('contactFormSubmitted', 'true');
    // Let the standard HTML form submit action execute naturally
  };

  const handleNewsletterSubmit = () => {
    setIsSubmittingNewsletter(true);
    sessionStorage.setItem('newsletterFormSubmitted', 'true');
    // Let the standard HTML form submit action execute naturally
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative">
      {/* Toast Notification Alert */}
      {toast.visible && (
        <div className="fixed top-24 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white animate-bounce bg-green-500">
          <i className="fas fa-check-circle text-lg"></i>
          <span className="font-semibold text-sm">{toast.message}</span>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Contact <span className="gradient-text font-extrabold">Me</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Have a question or want to work together? Drop me a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info Details */}
          <div className="space-y-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              Feel free to reach out via the form, directly by email, or connect with me on LinkedIn and GitHub. I look forward to hearing from you.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/20">
                  <i className="fas fa-envelope text-lg"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-gray-400 dark:text-gray-500">Email</h4>
                  <a href={`mailto:${personalInfo.email}`} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/20">
                  <i className="fas fa-phone text-lg"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-gray-400 dark:text-gray-500">Phone</h4>
                  <a href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/20">
                  <i className="fas fa-map-marker-alt text-lg"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-gray-400 dark:text-gray-500">Address</h4>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {personalInfo.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-750 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60">
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Send Message</h3>
            <form
              id="contact-form"
              action="https://formsubmit.co/sachinstha600@gmail.com"
              method="POST"
              onSubmit={handleContactSubmit}
              className="space-y-4"
            >
              {/* FormSubmit Configs */}
              <input type="hidden" name="_next" value="https://www.sachinshrestha.com/" />
              <input type="hidden" name="_subject" value="New Portfolio Message!" />

              <div>
                <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center glow text-sm shadow-md"
              >
                {isSubmittingContact ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="mt-20 max-w-2xl mx-auto text-center border-t border-gray-200 dark:border-gray-700/60 pt-16">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Subscribe to Newsletter</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 max-w-md mx-auto">
            Get the latest updates on my articles, automation guides, and projects delivered directly to your inbox.
          </p>
          <form
            id="newsletter-form"
            action="https://formsubmit.co/sachinstha600@gmail.com"
            method="POST"
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-lg mx-auto"
          >
            <input type="hidden" name="_next" value="https://www.sachinshrestha.com/" />
            <input type="hidden" name="_subject" value="New Newsletter Subscription!" />
            
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email Address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-transparent dark:text-white outline-none focus:border-blue-500 transition-all text-sm"
            />
            <button
              type="submit"
              disabled={isSubmittingNewsletter}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center glow text-sm shadow-md whitespace-nowrap"
            >
              {isSubmittingNewsletter ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Area */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Sachin Shrestha. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
export { Contact };
