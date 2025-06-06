module.exports = {
  validateContactForm: (data) => {
    const errors = {};
    const { name, email, message } = data;

    if (!name || name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Valid email is required';
    }

    if (!message || message.trim() === '') {
      errors.message = 'Message is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};