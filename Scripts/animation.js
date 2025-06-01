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
  particleContainer.style.zIndex = '0'; // Increase z-index to be above background but behind content
  body.appendChild(particleContainer);
  
  for (let i = 0; i < particleCount; i++) {
    // Create particles immediately but with staggered animation
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Create larger particles with higher opacity
    const size = Math.random() * 20 + 10; // Bigger particles
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight; // Start at random heights
    const duration = Math.random() * 20 + 15; // Longer durations
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(99, 102, 241, 0.6)'; // More visible color
    particle.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.8)'; // Stronger glow
    
    // Apply animation directly rather than relying on CSS class
    const keyframes = `
      @keyframes float${i} {
        0% { transform: translate(0, 0); opacity: 0.8; }
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
  
  // Log confirmation
  console.log("Created particles: " + particleCount);
}

// Check if the browser supports the features we need
function checkBrowserSupport() {
  return typeof document.querySelector === 'function' && 
         typeof window.requestAnimationFrame === 'function';
}

// Create network animation with connecting dots (only on the right side of home page)
function createNetworkAnimation() {
  // Only create animation on home page - check for multiple possible home section identifiers
  const homeSection = document.getElementById('home') || 
                     document.querySelector('.hero-section') ||
                     document.querySelector('section:first-of-type');
  
  if (!homeSection) {
    console.log('Network animation skipped: No home section found');
    return null;
  }
  
  // Clear any existing network containers
  document.querySelectorAll('.network-container').forEach(p => p.remove());
  
  // Create a container for the network positioned on the right side
  const networkContainer = document.createElement('div');
  networkContainer.classList.add('network-container');
  
  // Position the container on the right half of the home section
  networkContainer.style.position = 'absolute';
  networkContainer.style.top = '0';
  networkContainer.style.right = '0'; // Position from right instead of left
  networkContainer.style.width = '50%'; // Take up half the width
  networkContainer.style.height = '100%';
  networkContainer.style.pointerEvents = 'none';
  networkContainer.style.zIndex = '1';
  
  // Add the container to the home section
  homeSection.style.position = 'relative'; // Ensure proper positioning
  homeSection.appendChild(networkContainer);
  
  // Canvas setup for better performance
  const canvas = document.createElement('canvas');
  canvas.width = networkContainer.offsetWidth;
  canvas.height = homeSection.offsetHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.right = '0'; // Position from right
  networkContainer.appendChild(canvas);
  
  // Set up the animation on this canvas
  const cleanup = setupNetworkAnimation(canvas, networkContainer);
  
  // Return the cleanup function
  return cleanup;
}

// Separate function to set up the network animation on a canvas
function setupNetworkAnimation(canvas, container, heroImage = null) {
  const ctx = canvas.getContext('2d');
  
  // Particles configuration - more particles for a denser right side
  const particleCount = 50;
  const connectionDistance = 120;
  const particles = [];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1.5, 
      speedX: Math.random() * 0.5 - 0.25, // Slower movement for better visibility
      speedY: Math.random() * 0.5 - 0.25
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
      
      // Draw particle with higher opacity
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.8)';
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
          
          // Draw connecting line
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${lineOpacity * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  console.log("Network animation created on right side:", canvas.width, "x", canvas.height);
  
  // Handle window resize
  const resizeObserver = new ResizeObserver(() => {
    // Adjust canvas size on container size change
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
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
    console.error("Browser doesn't support required features for animation");
    return;
  }
  
  // Create network animation only on home page and behind the image
  createNetworkAnimation();
  
  // Add a simple debug element to confirm script is running
  const debug = document.createElement('div');
  debug.style.position = 'fixed';
  debug.style.bottom = '5px';
  debug.style.right = '5px';
  debug.style.padding = '2px 5px';
  debug.style.background = 'rgba(0,0,0,0.5)';
  debug.style.color = 'white';
  debug.style.fontSize = '10px';
  debug.style.zIndex = '9999';
  debug.textContent = 'Animation loaded';
  document.body.appendChild(debug);
  
  // Remove debug after 3 seconds
  setTimeout(() => {
    if (debug.parentNode) {
      debug.remove();
    }
  }, 3000);
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