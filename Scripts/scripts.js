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

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkillBars() {
skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
    bar.style.width = width;
    }, 100);
});
}

// Intersection Observer for scroll animations
const observerOptions = {
threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
    if (entry.isIntersecting) {
    entry.target.classList.add("visible");

    // If it's the about section, animate skill bars
    if (entry.target.id === "about") {
        animateSkillBars();
    }
    }
});
}, observerOptions);

document.querySelectorAll(".section").forEach((section) => {
observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function () {
  // ✅ Initialize EmailJS
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key

  // ✅ Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const submitButton = document.getElementById('submit-btn');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;

      emailjs.sendForm('service_ogf204q', 'template_cu2z2xf', this)
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('Your message has been sent successfully!');
          contactForm.reset();
        }, function (error) {
          console.error('FAILED...', error);
          alert('Failed to send message. Please try again.');
        })
        .finally(function () {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        });
    });
  }

  // ✅ Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const subscriberEmail = document.getElementById('subscriber-email').value;

      emailjs.send('service_ogf204q', 'template_newsletter', {
        subscriber_email: subscriberEmail
      })
        .then(function (response) {
          alert('Thank you for subscribing to our newsletter!');
          newsletterForm.reset();
        }, function (error) {
          alert('Failed to subscribe. Please try again.');
        });
    });
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
