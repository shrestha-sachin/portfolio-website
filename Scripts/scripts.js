// Remove the Azure API URL since we're using FormSubmit
// const API_BASE_URL = 'https://sachin-portfolio-api-bwf4bde4bmaxcefc.eastus-01.azurewebsites.net';

// Dark mode toggle - fixed version
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const moonIcon = themeToggle.querySelector(".fa-moon");
const sunIcon = themeToggle.querySelector(".fa-sun");

function setTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    
    // Make sure to explicitly handle both icons
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    
    // Make sure to explicitly handle both icons
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  }
}

// On load - Fixed to ensure icons are properly set on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
});

// Ensure theme toggle button works
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


// Projects filtering functionality - With smoother animations
document.addEventListener('DOMContentLoaded', function() {
  // Get the "View All Projects" button
  const viewAllProjectsBtn = document.querySelector('.view-all-projects-btn');
  
  if (viewAllProjectsBtn) {
    // Set initial button state
    viewAllProjectsBtn.setAttribute('href', '#projects');
    viewAllProjectsBtn.setAttribute('data-showing-all', 'false');
    
    // Get the projects container
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Create the animation handler
    viewAllProjectsBtn.addEventListener('click', function(event) {
      event.preventDefault();
      
      // Get all project cards
      const projectCards = document.querySelectorAll('.project-card');
      const isShowingAll = viewAllProjectsBtn.getAttribute('data-showing-all') === 'true';
      
      // Store current scroll position and container height
      const currentScrollPosition = window.scrollY;
      const containerHeight = projectsGrid.offsetHeight;
      
      if (!isShowingAll) {
        // Toggle the container class to show all projects
        projectsGrid.classList.add('show-all');
        
        // Setup a timeout to measure the new height after DOM updates
        setTimeout(() => {
          const newContainerHeight = projectsGrid.scrollHeight;
          
          // Update button with smooth fade
          viewAllProjectsBtn.style.opacity = '0';
          setTimeout(() => {
            viewAllProjectsBtn.innerHTML = '<i class="fas fa-chevron-up mr-2"></i> Show Less';
            viewAllProjectsBtn.style.opacity = '1';
          }, 200);
          viewAllProjectsBtn.setAttribute('data-showing-all', 'true');
          
          // Smooth scroll to show newly visible content if needed
          const bottomOfContainer = projectsGrid.getBoundingClientRect().bottom;
          if (bottomOfContainer > window.innerHeight) {
            // Calculate a nice scroll position that shows enough new content
            const scrollTo = currentScrollPosition + (newContainerHeight - containerHeight) * 0.6;
            window.scrollTo({
              top: scrollTo,
              behavior: 'smooth'  // Use smooth scroll like other sections
            });
          }
        }, 50); // Small delay to let the DOM update
        
      } else {
        // Toggle container class to hide projects
        projectsGrid.classList.remove('show-all');
        
        // Update button with smooth fade
        viewAllProjectsBtn.style.opacity = '0';
        setTimeout(() => {
          viewAllProjectsBtn.innerHTML = '<i class="fab fa-github mr-2"></i> View All Projects';
          viewAllProjectsBtn.style.opacity = '1';
        }, 200);
        viewAllProjectsBtn.setAttribute('data-showing-all', 'false');
        
        // Ensure we don't jump when hiding content
        window.scrollTo({
          top: Math.min(currentScrollPosition, projectsGrid.offsetTop - 100),
          behavior: 'smooth'
        });
      }
    });
  }
});