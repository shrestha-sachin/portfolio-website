// Certificate Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const certificateData = [
    {
      title: "Full Stack Web Development",
      issuer: "Udemy",
      date: "May 2023",
      description: "Comprehensive certification in modern web development including React, Node.js, and database technologies.",
      image: "./Resources/Images/Certificates/certificate-1.jpg"
    },
    {
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "December 2022",
      description: "Professional certification for designing distributed systems and cloud architecture on AWS.",
      image: "./Resources/Images/Certificates/certificate-2.jpg"
    },
    {
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "March 2023",
      description: "Advanced techniques in data analysis, visualization, and machine learning with Python.",
      image: "./Resources/Images/Certificates/certificate-3.jpg"
    }
    // Add more certificates as needed
  ];

  // Elements
  const carouselContainer = document.querySelector('.certificates-container');
  const slides = document.querySelectorAll('.certificate-slide');
  const prevButton = document.getElementById('prev-certificate');
  const nextButton = document.getElementById('next-certificate');
  const indicatorsContainer = document.querySelector('.certificate-carousel .absolute.bottom-20');
  const certificateTitle = document.getElementById('certificate-title');
  const certificateDescription = document.getElementById('certificate-description');
  
  // Initialize state
  let currentIndex = 0;
  let interval;
  const slideDuration = 10000; // 10 seconds
  
  // Setup indicators
  if (indicatorsContainer) {
    certificateData.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('certificate-indicator');
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
      indicatorsContainer.appendChild(indicator);
    });
  }
  
  // Display slide
  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
      slide.classList.remove('active', 'entering');
    });
    
    // Add active class to current slide
    if (slides[index]) {
      slides[index].classList.add('entering');
      setTimeout(() => {
        slides[index].classList.add('active');
      }, 50);
    }
    
    // Update indicators
    const indicators = document.querySelectorAll('.certificate-indicator');
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    // Update details
    if (certificateTitle && certificateDescription) {
      certificateTitle.textContent = certificateData[index].title;
      certificateDescription.textContent = certificateData[index].description;
    }
    
    currentIndex = index;
  }
  
  // Go to specific slide
  function goToSlide(index) {
    clearInterval(interval);
    
    let targetIndex = index;
    if (targetIndex < 0) targetIndex = slides.length - 1;
    if (targetIndex >= slides.length) targetIndex = 0;
    
    // Position the slides container
    carouselContainer.style.transform = `translateX(-${targetIndex * 100}%)`;
    
    showSlide(targetIndex);
    startAutoSlide();
  }
  
  // Navigation functions
  function goToNextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function goToPrevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Auto slide function
  function startAutoSlide() {
    interval = setInterval(goToNextSlide, slideDuration);
  }
  
  // Setup event listeners
  if (prevButton) {
    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      goToPrevSlide();
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      goToNextSlide();
    });
  }
  
  // Initialize carousel
  showSlide(0);
  startAutoSlide();
  
  // Pause auto-rotation when hovering over the carousel
  const carousel = document.querySelector('.certificate-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }
  
  // Add touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      goToNextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      goToPrevSlide();
    }
  }
});