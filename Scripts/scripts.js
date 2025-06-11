// Remove the Azure API URL since we're using FormSubmit
// const API_BASE_URL = 'https://sachin-portfolio-api-bwf4bde4bmaxcefc.eastus-01.azurewebsites.net';

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

// Form submission handling for UI enhancements
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  // Contact form handler - just for UI, let FormSubmit handle the actual submission
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // We don't prevent default - FormSubmit will handle the actual submission
      // Just show a loader while navigating away
      
      // Store that form was submitted in session storage to show success notification
      // when user returns from FormSubmit redirect
      sessionStorage.setItem('contactFormSubmitted', 'true');
    });
  }

  // Newsletter form handler - just for UI, let FormSubmit handle the actual submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function() {
      const subscribeButton = newsletterForm.querySelector('button[type="submit"]');
      const originalText = subscribeButton.innerHTML;
      subscribeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      
      // We don't prevent default - FormSubmit will handle the actual submission
      // Just show a loader while navigating away
      
      // Store that form was submitted in session storage to show success notification
      // when user returns from FormSubmit redirect
      sessionStorage.setItem('newsletterFormSubmitted', 'true');
    });
  }

  // Check if we've been redirected back after a form submission
  // This works with the _next parameter in the FormSubmit configuration
  if (sessionStorage.getItem('contactFormSubmitted')) {
    showNotification('success', 'Message sent successfully!');
    sessionStorage.removeItem('contactFormSubmitted');
  }
  
  if (sessionStorage.getItem('newsletterFormSubmitted')) {
    showNotification('success', 'Subscribed successfully!');
    sessionStorage.removeItem('newsletterFormSubmitted');
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