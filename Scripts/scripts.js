// Replace the entire file with this corrected version
//console.log("EmailJS loaded?", typeof emailjs !== 'undefined', emailjs);

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const moonIcon = themeToggle.querySelector(".fa-moon");
const sunIcon = themeToggle.querySelector(".fa-sun");

function setTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  }
}

// On load
const savedTheme = localStorage.getItem("theme");
if (
  savedTheme === "dark" ||
  (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  setTheme("dark");
} else {
  setTheme("light");
}

themeToggle.addEventListener("click", () => {
  setTheme(html.classList.contains("dark") ? "light" : "dark");
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      mobileMenu.classList.add("hidden");
    }
  });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS if not already initialized
  if (typeof emailjs === 'undefined') {
    console.error('EmailJS not loaded!');
  } else if (!emailjs.init) {
    console.error('EmailJS not initialized!');
  } else {
    console.log('EmailJS is ready');
  }

  // Contact form setup
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const submitButton = document.getElementById('submit-btn');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // Get current time in a readable format
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      time: timeString,
      subject: document.getElementById('subject').value || 'New message from portfolio contact form'
    };

    // Send to your backend API instead of EmailJS
    fetch('https://sachin-portfolio-api.azurewebsites.net/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        showNotification('success', data.message);
        contactForm.reset();
      } else if (data.errors) {
        showNotification('error', data.errors.join(' '));
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showNotification('error', 'Failed to send message. Please try again.');
    })
    .finally(() => {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    });
  });
}

// Newsletter form setup
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the subscribe button and show loading state
    const subscribeButton = newsletterForm.querySelector('button[type="submit"]');
    const originalText = subscribeButton.innerHTML;
    subscribeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    subscribeButton.disabled = true;
    
    const subscriberEmail = document.getElementById('subscriber-email').value;
    console.log("Attempting to subscribe email:", subscriberEmail);
    
    // Send to your Azure backend API
    fetch('https://sachin-portfolio-api.azurewebsites.net/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: subscriberEmail })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        showNotification('success', data.message || 'Thank you for subscribing!');
        newsletterForm.reset();
      } else if (data.errors) {
        showNotification('error', data.errors.join(' '));
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showNotification('error', 'Failed to subscribe. Please try again.');
    })
    .finally(() => {
      // Reset button state
      subscribeButton.innerHTML = originalText;
      subscribeButton.disabled = false;
    });
  });
}

// Notification function
window.showNotification = function(type, message) {
  const notification = document.getElementById('notification');
  const notificationIcon = document.getElementById('notification-icon');
  const notificationMessage = document.getElementById('notification-message');
  
  // Set message and icon
  notificationMessage.textContent = message;
  
  // Set styles based on type
  notification.className = 'fixed bottom-5 right-5 p-4 rounded-lg shadow-lg transition-all duration-300 transform'; 
  
  if (type === 'success') {
    notification.classList.add('bg-green-500', 'text-white');
    notificationIcon.className = 'fas fa-check-circle mr-3 text-lg';
    notification.classList.remove('bg-red-500');
  } else {
    notification.classList.add('bg-red-500', 'text-white');
    notificationIcon.className = 'fas fa-times-circle mr-3 text-lg';
    notification.classList.remove('bg-green-500');
  }
  
  // Show notification
  notification.classList.remove('translate-y-full', 'opacity-0');
  notification.classList.add('translate-y-0', 'opacity-100');
  
  // Auto hide after 5 seconds
  setTimeout(function() {
    notification.classList.add('translate-y-full', 'opacity-0');
    notification.classList.remove('translate-y-0', 'opacity-100');
  }, 5000);
}
});

// Floating animation for elements
const floatingElements = document.querySelectorAll(".floating");

floatingElements.forEach((el) => {
  const delay = Math.random() * 5;
  el.style.animationDelay = `${delay}s`;
});

// Back to top button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});