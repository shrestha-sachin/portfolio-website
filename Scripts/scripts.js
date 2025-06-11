const API_BASE_URL = 'https://sachin-portfolio-api-bwf4bde4bmaxcefc.eastus-01.azurewebsites.net';

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
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  // Contact form handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        time: new Date().toISOString()
      };
      
      // Send to Azure API backend
      fetch(`${API_BASE_URL}/api/contact`, {
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

  // Newsletter form handler
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const subscribeButton = newsletterForm.querySelector('button[type="submit"]');
      const originalText = subscribeButton.innerHTML;
      subscribeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      subscribeButton.disabled = true;
      
      const subscriberEmail = document.getElementById('subscriber-email').value;
      console.log('Attempting to subscribe email:', subscriberEmail);
      
      // Send to Azure API backend
      fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: subscriberEmail })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          showNotification('success', data.message);
          newsletterForm.reset();
        } else if (data.error) {
          showNotification('error', data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showNotification('error', 'Failed to subscribe. Please try again.');
      })
      .finally(() => {
        subscribeButton.innerHTML = originalText;
        subscribeButton.disabled = false;
      });
    });
  }

  // Notification function
  function showNotification(type, message) {
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notification-icon');
    const notificationMessage = document.getElementById('notification-message');
    
    if (type === 'success') {
      notification.classList.add('bg-green-500');
      notification.classList.remove('bg-red-500');
      notificationIcon.classList.add('fa-check-circle');
      notificationIcon.classList.remove('fa-exclamation-circle');
    } else {
      notification.classList.add('bg-red-500');
      notification.classList.remove('bg-green-500');
      notificationIcon.classList.add('fa-exclamation-circle');
      notificationIcon.classList.remove('fa-check-circle');
    }
    
    notificationMessage.textContent = message;
    notification.classList.remove('translate-y-full', 'opacity-0');
    
    setTimeout(() => {
      notification.classList.add('translate-y-full', 'opacity-0');
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