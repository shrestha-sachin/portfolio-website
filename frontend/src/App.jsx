import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Videos from './components/Videos';
import Leadership from './components/Leadership';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

export default function App() {
  // Interactive Custom Cursor (Ring + Precision Dot)
  useEffect(() => {
    // Disable custom cursor on mobile/touch screens
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Create cursor DOM nodes
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');

    cursorDot.id = 'custom-cursor-dot';
    cursorRing.id = 'custom-cursor-ring';

    // Style the nodes
    cursorDot.className = 'fixed rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out';
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    cursorDot.style.left = '-20px';
    cursorDot.style.top = '-20px';
    cursorDot.style.willChange = 'left, top, transform';

    cursorRing.className = 'fixed rounded-full pointer-events-none z-[9999] border-2 transition-all duration-300 ease-out';
    cursorRing.style.width = '32px';
    cursorRing.style.height = '32px';
    cursorRing.style.transform = 'translate(-50%, -50%)';
    cursorRing.style.left = '-50px';
    cursorRing.style.top = '-50px';
    cursorRing.style.willChange = 'left, top, transform, width, height, background-color, border-color';

    // Function to get active colors based on theme
    function getColors() {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? {
        dotBg: '#a78bfa', // violet-400
        ringBorder: 'rgba(167, 139, 250, 0.5)',
        ringHoverBg: 'rgba(167, 139, 250, 0.15)',
        ringHoverBorder: 'rgba(167, 139, 250, 0.8)'
      } : {
        dotBg: '#3b82f6', // blue-500
        ringBorder: 'rgba(59, 130, 246, 0.5)',
        ringHoverBg: 'rgba(59, 130, 246, 0.12)',
        ringHoverBorder: 'rgba(59, 130, 246, 0.8)'
      };
    }

    // Initial colors
    const initColors = getColors();
    cursorDot.style.backgroundColor = initColors.dotBg;
    cursorRing.style.borderColor = initColors.ringBorder;

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // Track mouse movement
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };

    // Smooth elastic lag follow loop
    let animationFrameId;
    const animateRing = () => {
      const easing = 0.16; // Elastic delay coefficient
      ringX += (mouseX - ringX) * easing;
      ringY += (mouseY - ringY) * easing;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      animationFrameId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(animateRing);

    // Hover detection for interactive items
    const handleMouseEnter = () => {
      const colors = getColors();
      cursorRing.style.width = '55px';
      cursorRing.style.height = '55px';
      cursorRing.style.backgroundColor = colors.ringHoverBg;
      cursorRing.style.borderColor = colors.ringHoverBorder;
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.4)';
    };

    const handleMouseLeave = () => {
      const colors = getColors();
      cursorRing.style.width = '32px';
      cursorRing.style.height = '32px';
      cursorRing.style.backgroundColor = 'transparent';
      cursorRing.style.borderColor = colors.ringBorder;
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    const bindHoverListeners = () => {
      // Find all clickable/interactive triggers
      const targets = document.querySelectorAll('a, button, .skill-card, .project-card, .gallery-item, iframe');
      targets.forEach((target) => {
        // Prevent duplicate bindings
        target.removeEventListener('mouseenter', handleMouseEnter);
        target.removeEventListener('mouseleave', handleMouseLeave);
        target.addEventListener('mouseenter', handleMouseEnter);
        target.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    bindHoverListeners();
    // Periodically sweep to bind dynamically updated list items (e.g. tabs change)
    const hoverSweepInterval = setInterval(bindHoverListeners, 1500);

    // Click effect (Mousedown scale pulse)
    const onMouseDown = () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(0.75)';
    };

    const onMouseUp = () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Sync colors with Theme toggling
    const observer = new MutationObserver(() => {
      const colors = getColors();
      cursorDot.style.backgroundColor = colors.dotBg;
      // Update only if not currently hovering to prevent overriding active states
      const isHovering = cursorRing.style.width === '55px';
      if (!isHovering) {
        cursorRing.style.borderColor = colors.ringBorder;
      } else {
        cursorRing.style.borderColor = colors.ringHoverBorder;
        cursorRing.style.backgroundColor = colors.ringHoverBg;
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clearInterval(hoverSweepInterval);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (cursorDot.parentNode) cursorDot.parentNode.removeChild(cursorDot);
      if (cursorRing.parentNode) cursorRing.parentNode.removeChild(cursorRing);
    };
  }, []);

  const [particles, setParticles] = useState([]);

  // Generate background particles
  useEffect(() => {
    const generated = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 6,
      left: Math.random() * 95,
      top: Math.random() * 95,
      delay: Math.random() * 5
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300 relative select-none">
      
      {/* Floating Particles in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle floating"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              position: 'absolute'
            }}
          />
        ))}
      </div>

      {/* Main Pages Layout */}
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Leadership />
        <Awards />
        <Projects />
        <Videos />
        <Contact />
      </main>

      {/* Chatbot Overlay Widget */}
      <Chatbot />
      
    </div>
  );
}
