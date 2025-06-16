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

// =========================================
// PROJECT TABS AND VIEW ALL FUNCTIONALITY
// =========================================

// Step 1: Set up the project tabs functionality
const projectTabs = document.querySelectorAll('.project-tab-btn');
const projectCategories = document.querySelectorAll('.project-category');

if (projectTabs.length > 0 && projectCategories.length > 0) {
  // Tab click handler
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');
      
      // Update active tab
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show selected category
      projectCategories.forEach(cat => {
        if (cat.id === `category-${category}`) {
          cat.classList.add('active');
        } else {
          cat.classList.remove('active');
        }
      });
      
      // Store selected tab in localStorage for persistence
      localStorage.setItem('selectedProjectTab', category);
    });
  });
  
  // Check if there's a saved tab preference
  const savedTab = localStorage.getItem('selectedProjectTab');
  if (savedTab) {
    const tabToActivate = document.querySelector(`.project-tab-btn[data-category="${savedTab}"]`);
    if (tabToActivate) {
      tabToActivate.click();
    }
  }

  // Step 2: Fix the "View All" buttons functionality
  // First, save category names for better button labeling
  projectTabs.forEach(btn => {
    const category = btn.getAttribute('data-category');
    const categoryName = btn.textContent.trim();
    const viewButton = document.querySelector(`#category-${category} .view-all-projects-btn`);
    if (viewButton) {
      viewButton.setAttribute('data-category-name', categoryName);
    }
  });
}

// Step 3: The single, correct implementation of View All/Show Less buttons
const viewAllButtons = document.querySelectorAll('.view-all-projects-btn');

if (viewAllButtons.length > 0) {
  console.log("Setting up View All buttons:", viewAllButtons.length, "found");
  
  viewAllButtons.forEach(button => {
    // IMPORTANT: Remove any href attribute completely to prevent navigation
    button.removeAttribute('href');
    
    button.addEventListener('click', function(event) {
      // Stop default link behavior immediately
      event.preventDefault();
      event.stopPropagation();
      
      console.log("View All/Show Less button clicked");
      
      const category = this.closest('.project-category');
      const projectsGrid = category.querySelector('.projects-grid');
      
      if (!projectsGrid) {
        console.error("No projects grid found");
        return;
      }
      
      const isShowingAll = projectsGrid.classList.contains('show-all');
      const categoryName = this.getAttribute('data-category-name') || 'Projects';
      
      console.log("Toggle state:", isShowingAll ? "showing all → hide some" : "hiding some → show all");
      
      if (isShowingAll) {
        // HIDE extra projects
        projectsGrid.classList.remove('show-all');
        
        // Get the right icon based on category
        const iconClass = 
          categoryName.includes("Web") ? "fab fa-github" : 
          categoryName.includes("Design") ? "fas fa-images" : 
          categoryName.includes("Art") ? "fas fa-paint-brush" : 
          "fab fa-github";
        
        // Update button text
        this.innerHTML = `<i class="${iconClass} mr-2"></i> View All ${categoryName}`;
        
      } else {
        // SHOW all projects
        projectsGrid.classList.add('show-all');
        
        // Update button text
        this.innerHTML = '<i class="fas fa-chevron-up mr-2"></i> Show Less';
      }
      
      // Prevent any further event propagation
      return false;
    });
  });
}

// Video lazy loading
const videoIframes = document.querySelectorAll('iframe');
if (videoIframes.length > 0) {
  const observerOptions = {
    rootMargin: '100px',
    threshold: 0.1
  };
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        const src = iframe.getAttribute('data-src');
        if (src) {
          iframe.setAttribute('src', src);
          iframe.removeAttribute('data-src');
          videoObserver.unobserve(iframe);
        }
      }
    });
  }, observerOptions);
  
  videoIframes.forEach(iframe => {
    // Only observe iframes with data-src attribute
    if (iframe.getAttribute('data-src')) {
      videoObserver.observe(iframe);
    }
  });
}