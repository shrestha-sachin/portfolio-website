document.addEventListener('DOMContentLoaded', function() {
  // Initialize all carousels
  initializeCarousels();
});

function initializeCarousels() {
  const carousels = document.querySelectorAll('.gallery-carousel');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const leftArrow = carousel.querySelector('.carousel-arrow.left');
    const rightArrow = carousel.querySelector('.carousel-arrow.right');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!track || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create dots
    createDots(dotsContainer, totalSlides, currentSlide);
    
    // Set initial position
    updateCarousel(track, slides, currentSlide, dotsContainer);
    
    // Arrow click handlers
    if (leftArrow) {
      leftArrow.addEventListener('click', () => {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        updateCarousel(track, slides, currentSlide, dotsContainer);
      });
    }
    
    if (rightArrow) {
      rightArrow.addEventListener('click', () => {
        currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel(track, slides, currentSlide, dotsContainer);
      });
    }
    
    // Dot click handlers
    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('carousel-dot')) {
          currentSlide = parseInt(e.target.dataset.slide);
          updateCarousel(track, slides, currentSlide, dotsContainer);
        }
      });
    }
    
    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel(track, slides, currentSlide, dotsContainer);
      }, 5000);
    }
    
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        } else {
          currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        }
        updateCarousel(track, slides, currentSlide, dotsContainer);
      }
    }
  });
}

function createDots(dotsContainer, totalSlides, currentSlide) {
  if (!dotsContainer) return;
  
  dotsContainer.innerHTML = '';
  
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dot.dataset.slide = i;
    
    if (i === currentSlide) {
      dot.classList.add('active');
    }
    
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel(track, slides, currentSlide, dotsContainer) {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  track.dataset.currentSlide = currentSlide;
}