// Image Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeButton = document.getElementById('lightbox-close');
  const zoomInButton = document.getElementById('zoom-in-btn');
  const zoomOutButton = document.getElementById('zoom-out-btn');
  const downloadButton = document.getElementById('download-btn');
  const zoomLevelDisplay = document.getElementById('zoom-level');
  const imageContainer = document.getElementById('image-container');
  
  let currentZoom = 1;
  let isDragging = false;
  let startX, startY, translateX = 0, translateY = 0;
  
  // Open lightbox when "View Larger" is clicked
  document.querySelectorAll('.show-lightbox').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const imgSrc = this.getAttribute('data-img');
      const imgTitle = this.getAttribute('data-title');
      
      // Reset zoom and position
      currentZoom = 1;
      translateX = 0;
      translateY = 0;
      updateImageTransform();
      zoomLevelDisplay.textContent = '100%';
      
      // Set image source and title
      lightboxImage.setAttribute('src', imgSrc);
      lightboxTitle.textContent = imgTitle;
      
      // Update download button
      downloadButton.addEventListener('click', function() {
        // Get current image source and title
        const imgSrc = lightboxImage.getAttribute('src');
        const imgTitle = lightboxTitle.textContent || 'download-image';
        
        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = imgTitle.toLowerCase().replace(/\s+/g, '-') + '.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Add visual feedback
        this.innerHTML = '<i class="fas fa-check text-xl"></i>';
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-download text-xl"></i>';
        }, 1000);
      });
      
      // Show lightbox
      lightbox.classList.remove('hidden');
      setTimeout(() => {
        lightbox.classList.add('active');
      }, 10);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === this) {
      closeLightbox();
    }
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  }
  
  // Zoom functionality
  zoomInButton.addEventListener('click', function() {
    if (currentZoom < 3) { // Max zoom: 300%
      currentZoom += 0.25;
      updateZoom();
    }
  });
  
  zoomOutButton.addEventListener('click', function() {
    if (currentZoom > 0.5) { // Min zoom: 50%
      currentZoom -= 0.25;
      updateZoom();
    }
  });
  
  function updateZoom() {
    updateImageTransform();
    zoomLevelDisplay.textContent = Math.round(currentZoom * 100) + '%';
  }
  
  // Image dragging functionality
  lightboxImage.addEventListener('mousedown', startDrag);
  lightboxImage.addEventListener('touchstart', startDrag);
  
  function startDrag(e) {
    if (currentZoom <= 1) return; // Only allow dragging when zoomed in
    
    isDragging = true;
    
    if (e.type === 'touchstart') {
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    } else {
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
    }
    
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  }
  
  function onDrag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    let clientX, clientY;
    
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Calculate new position
    translateX = clientX - startX;
    translateY = clientY - startY;
    
    // Limit dragging based on zoom level
    const maxTranslate = 100 * (currentZoom - 1);
    translateX = Math.max(-maxTranslate, Math.min(maxTranslate, translateX));
    translateY = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));
    
    updateImageTransform();
  }
  
  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  }
  
  function updateImageTransform() {
    lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }
  
  // Keyboard controls
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case '+':
        zoomInButton.click();
        break;
      case '-':
        zoomOutButton.click();
        break;
    }
  });
  
  // Mouse wheel zoom
  lightbox.addEventListener('wheel', function(e) {
    if (e.deltaY < 0) {
      zoomInButton.click();
    } else {
      zoomOutButton.click();
    }
    e.preventDefault();
  });
  
  // Make all download buttons work
  document.querySelectorAll('.download-image').forEach(button => {
    button.addEventListener('click', function(e) {
      // The download attribute handles this automatically
      // Just add some visual feedback
      this.classList.add('text-green-800');
      setTimeout(() => {
        this.classList.remove('text-green-800');
      }, 300);
    });
  });
});