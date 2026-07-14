document.addEventListener('DOMContentLoaded', function() {
  // Initialize both galleries when the document is ready
  initializeGallery('graphics');
  initializeGallery('art');
});

// Main initialization function for each gallery type
function initializeGallery(type) {
  const galleryContainer = document.getElementById(`${type}-gallery`);
  const galleryImages = document.querySelectorAll(`.${type}-gallery-item`);
  
  if (!galleryContainer || galleryImages.length === 0) return;
  
  // Set up click handlers for gallery items
  galleryImages.forEach((image, index) => {
    image.addEventListener('click', function() {
      openLightbox(type, index);
    });
    
    // Add hover animation similar to project cards
    image.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
    });
    
    image.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
  });

  // Setup carousel
  setupCarousel(type);
}

// Helper function to open the lightbox for a specific image
function openLightbox(type, index) {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const downloadBtn = document.getElementById('download-btn');
  
  if (!lightbox || !lightboxImage || !lightboxTitle) {
    console.error("Lightbox elements not found");
    return;
  }
  
  // Get the clicked gallery item
  const galleryItems = document.querySelectorAll(`.${type}-gallery-item`);
  if (index < 0 || index >= galleryItems.length) {
    console.error("Invalid gallery item index");
    return;
  }
  
  const galleryItem = galleryItems[index];
  const imageSrc = galleryItem.getAttribute('data-full-image') || galleryItem.querySelector('img')?.src;
  if (!imageSrc) {
    console.error("Could not find image source");
    return;
  }
  
  const imageTitle = galleryItem.getAttribute('data-title') || 'Gallery Image';
  
  // Set the lightbox content
  lightboxImage.src = imageSrc;
  lightboxTitle.textContent = imageTitle;
  
  // Reset zoom and position
  lightboxImage.style.transform = 'translate(0, 0) scale(1)';
  if (downloadBtn) {
    downloadBtn.innerHTML = '<i class="fas fa-download text-xl"></i>';
  }
  
  // Show the lightbox
  lightbox.classList.remove('hidden');
  setTimeout(() => {
    lightbox.classList.add('active');
  }, 10);
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
}

// Set up the carousel functionality
function setupCarousel(type) {
  console.log(`Setting up carousel for ${type}`);
  const carousel = document.querySelector(`.${type}-carousel`);
  if (!carousel) {
    console.error(`Carousel for ${type} not found`);
    return;
  }
  
  const carouselTrack = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  
  if (!carouselTrack) {
    console.error(`Carousel track for ${type} not found`);
    return;
  }

  if (slides.length === 0) {
    console.error(`No slides found for ${type} carousel`);
    return;
  }
  
  console.log(`Found ${slides.length} slides for ${type} carousel`);
  
  // Clear existing dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    
    // Add dots for navigation
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Slide ${index + 1}`);
      dot.dataset.index = index;
      
      dot.addEventListener('click', function() {
        goToSlide(type, index);
        resetCarouselInterval(type);
      });
      
      dotsContainer.appendChild(dot);
    });
  }
  
  // Set up arrow buttons
  const leftArrow = carousel.querySelector('.carousel-arrow.left');
  const rightArrow = carousel.querySelector('.carousel-arrow.right');
  
  if (leftArrow) {
    leftArrow.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const currentIndex = parseInt(carouselTrack.dataset.currentSlide || 0);
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(type, prevIndex);
      resetCarouselInterval(type);
    });
  }
  
  if (rightArrow) {
    rightArrow.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const currentIndex = parseInt(carouselTrack.dataset.currentSlide || 0);
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(type, nextIndex);
      resetCarouselInterval(type);
    });
  }
  
  // Set initial slide
  goToSlide(type, 0);
  
  // Set up auto-rotation
  startCarouselInterval(type);
  
  // Add pause on hover functionality
  carousel.addEventListener('mouseenter', () => {
    clearCarouselInterval(type);
  });
  
  carousel.addEventListener('mouseleave', () => {
    startCarouselInterval(type);
  });
  
  // Add touch support
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    
    const currentIndex = parseInt(carouselTrack.dataset.currentSlide || 0);
    if (touchEndX < touchStartX - 50) {
      // Swipe left - next slide
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(type, nextIndex);
      resetCarouselInterval(type);
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right - previous slide
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(type, prevIndex);
      resetCarouselInterval(type);
    }
  }, { passive: true });
}

// Function to move to a specific slide
function goToSlide(type, index) {
  const carousel = document.querySelector(`.${type}-carousel`);
  if (!carousel) return;
  
  const carouselTrack = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  
  console.log(`Moving ${type} carousel to slide ${index}`);
  
  // Update active slide
  slides.forEach((slide, i) => {
    // Remove all position classes
    slide.classList.remove('center-slide', 'left-slide', 'right-slide', 'far-slide');
    
    // Calculate relative position
    let position = (i - index) % slides.length;
    if (position < 0) position += slides.length;
    
    // Apply appropriate position class
    if (position === 0) {
      slide.classList.add('center-slide');
    } else if (position === 1) {
      slide.classList.add('right-slide');
    } else if (position === slides.length - 1) {
      slide.classList.add('left-slide');
    } else {
      slide.classList.add('far-slide');
    }
  });
  
  // Update active dot
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  // Store current slide index
  carouselTrack.dataset.currentSlide = index;
}

// Carousel interval management
const carouselIntervals = {};

function startCarouselInterval(type) {
  const carousel = document.querySelector(`.${type}-carousel`);
  if (!carousel) return;
  
  const carouselTrack = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  
  if (carouselIntervals[type]) {
    clearInterval(carouselIntervals[type]);
  }
  
  carouselIntervals[type] = setInterval(() => {
    const currentIndex = parseInt(carouselTrack.dataset.currentSlide || 0);
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(type, nextIndex);
  }, 5000); // Change slide every 5 seconds
}

function clearCarouselInterval(type) {
  if (carouselIntervals[type]) {
    clearInterval(carouselIntervals[type]);
  }
}

function resetCarouselInterval(type) {
  clearCarouselInterval(type);
  startCarouselInterval(type);
      if (carouselInterval) {
        clearInterval(parseInt(carouselInterval));
        startCarouselForType(type);
      }
    }


// Helper function to start carousel for a specific type
function startCarouselForType(type) {
  const carousel = document.querySelector(`.${type}-carousel`);
  if (!carousel) return;
  
  const carouselTrack = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  
  if (carouselTrack && slides.length) {
    // Clear any existing interval
    if (carousel.dataset.intervalId) {
      clearInterval(parseInt(carousel.dataset.intervalId));
    }
    
    // Set up new interval
    const intervalId = setInterval(() => {
      const currentIndex = parseInt(carouselTrack.dataset.currentSlide || 0);
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(type, nextIndex);
    }, 5000);
    
    // Store interval ID in the carousel element
    carousel.dataset.intervalId = intervalId;
  }
}
