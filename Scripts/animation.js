// Create animated background particles
function createParticles() {
  const body = document.querySelector('body');
  const particleCount = 30;
  
  // Clear any existing particles first
  document.querySelectorAll('.particle').forEach(p => p.remove());
  
  // Create a container for particles to improve performance
  const particleContainer = document.createElement('div');
  particleContainer.classList.add('particle-container');
  particleContainer.style.position = 'fixed';
  particleContainer.style.top = '0';
  particleContainer.style.left = '0';
  particleContainer.style.width = '100vw';
  particleContainer.style.height = '100vh';
  particleContainer.style.pointerEvents = 'none';
  particleContainer.style.zIndex = '-1'; // Place behind content
  body.appendChild(particleContainer);
  
  for (let i = 0; i < particleCount; i++) {
    // Create particles immediately but with staggered animation
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Create larger particles with higher opacity
    const size = Math.random() * 15 + 5; // Slightly smaller particles
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight; // Start at random heights
    const duration = Math.random() * 20 + 15; // Longer durations
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(99, 102, 241, 0.3)'; // Less visible color
    particle.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.5)'; // Softer glow
    
    // Apply animation directly rather than relying on CSS class
    const keyframes = `
      @keyframes float${i} {
        0% { transform: translate(0, 0); opacity: 0.4; }
        100% { transform: translate(${Math.random() * 100 - 50}px, ${-Math.random() * 500 - 200}px); opacity: 0; }
      }
    `;
    
    // Add keyframes to document
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    
    // Apply animation
    particle.style.animation = `float${i} ${duration}s linear infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particleContainer.appendChild(particle);
  }
}

// Check if the browser supports the features we need
function checkBrowserSupport() {
  return typeof document.querySelector === 'function' && 
         typeof window.requestAnimationFrame === 'function';
}

// Create network animation with connecting dots (full page)
function createNetworkAnimation() {
  // Only create animation on home page - check for multiple possible home section identifiers
  const homeSection = document.getElementById('home') || 
                     document.querySelector('.hero-section') ||
                     document.querySelector('section:first-of-type');
  
  if (!homeSection) {
    return null;
  }
  
  // Clear any existing network containers
  document.querySelectorAll('.network-container').forEach(p => p.remove());
  
  // Create a container for the network positioned on the entire home section
  const networkContainer = document.createElement('div');
  networkContainer.classList.add('network-container');
  
  // Position the container to cover the full home section
  networkContainer.style.position = 'absolute';
  networkContainer.style.top = '0';
  networkContainer.style.left = '0'; // Position from left
  networkContainer.style.width = '100%'; // Full width
  networkContainer.style.height = '100%';
  networkContainer.style.pointerEvents = 'none';
  networkContainer.style.zIndex = '0'; // Behind content
  networkContainer.style.overflow = 'hidden'; // Prevent overflow
  
  // Add the container to the home section
  homeSection.style.position = 'relative'; // Ensure proper positioning
  homeSection.appendChild(networkContainer);
  
  // Canvas setup for better performance
  const canvas = document.createElement('canvas');
  canvas.width = networkContainer.offsetWidth;
  canvas.height = homeSection.offsetHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0'; // Position from left
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  networkContainer.appendChild(canvas);
  
  // Set up the animation on this canvas
  const cleanup = setupNetworkAnimation(canvas, networkContainer);
  
  // Return the cleanup function
  return cleanup;
}

// Separate function to set up the network animation on a canvas
function setupNetworkAnimation(canvas, container) {
  const ctx = canvas.getContext('2d');
  
  // Particles configuration - fewer particles for a cleaner look
  const particleCount = 30; // Reduced from 50
  const connectionDistance = 100; // Slightly reduced
  const particles = [];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1, // Smaller particles
      speedX: Math.random() * 0.2 - 0.1, // Slower movement for better visibility
      speedY: Math.random() * 0.2 - 0.1
    });
  }
  
  // Animation function with RAF ID for cleanup
  let animationId;
  
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Move particles
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce on edges
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      // Draw particle with reduced opacity
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.5)'; // Lower opacity
      ctx.fill();
      
      // Connect with nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          // Calculate opacity based on distance
          const lineOpacity = 1 - (distance / connectionDistance);
          
          // Draw connecting line with reduced opacity
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${lineOpacity * 0.3})`; // Reduced opacity
          ctx.lineWidth = 0.5; // Thinner lines
          ctx.stroke();
        }
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Handle window resize
  const resizeObserver = new ResizeObserver(() => {
    // Adjust canvas size on container size change
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  });
  
  resizeObserver.observe(container.parentNode);
  
  // Return a cleanup function
  return function cleanup() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  };
}

// Initialize animation
function initializeAnimation() {
  if (!checkBrowserSupport()) {
    return;
  }
  
  // Create network animation on entire home page
  createNetworkAnimation();
  
  // No debug element - removed
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeAnimation);

// Ensure it runs if the page is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initializeAnimation, 100);
}

// Window resize handling with debounce
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recreate the animation on resize
    document.querySelectorAll('.network-container').forEach(p => p.remove());
    createNetworkAnimation();
  }, 250);
});

// Add CSS to ensure no horizontal overflow
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    body {
      overflow-x: hidden;
      width: 100%;
      max-width: 100vw;
    }
    
    .network-container, canvas {
      max-width: 100%;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});

// Fix for desktop view on mobile browsers
document.addEventListener('DOMContentLoaded', function() {
  // Function to check if we're in desktop view on a mobile device
  function isDesktopViewOnMobile() {
    // Most mobile browsers in desktop mode have a high device pixel ratio and large viewport
    return (window.devicePixelRatio > 1.5 && window.innerWidth > 1000);
  }
  
  // Add special styles for desktop view on mobile
  if (isDesktopViewOnMobile()) {
    const style = document.createElement('style');
    style.textContent = `
      /* Make home section more compact for desktop view on mobile */
      #home {
        min-height: 70svh !important; /* Smaller height */
        padding-top: 4rem !important;
        padding-bottom: 4rem !important;
      }
      
      /* Smaller profile image for desktop view on mobile */
      #home .floating {
        width: 10rem !important;
        height: 10rem !important;
      }
      
      /* Tighter text spacing */
      #home h1 {
        margin-bottom: 0.25rem !important;
      }
      
      #home h2 {
        margin-bottom: 0.25rem !important;
      }
      
      #home p {
        margin-bottom: 0.5rem !important;
      }
      
      /* Reduce vertical gaps */
      #home .gap-2, #home .gap-4, #home .gap-6 {
        gap: 0.5rem !important;
      }
    `;
    document.head.appendChild(style);
  }
});