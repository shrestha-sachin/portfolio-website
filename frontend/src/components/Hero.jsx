import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const canvasRef = useRef(null);

  const titles = [
    "Software Engineer",
    "Full Stack Developer",
    "Tech Enthusiast",
    "Problem Solver",
    "Web Developer",
    "UI/UX Designer"
  ];

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timer;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentTitle.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 50);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    } else {
      if (charIndex < currentTitle.length) {
        timer = setTimeout(() => {
          setDisplayText(currentTitle.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 100);
      } else {
        // Pause when title is fully typed, then start deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  // Connected-Dots Network Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    // Set initial size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const particleCount = 30;
    const connectionDistance = 100;
    const particles = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.2 - 0.1,
        speedY: Math.random() * 0.2 - 0.1
      });
    }

    let animationId;

    const getColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        particle: isDark ? 'rgba(139, 92, 246, 0.4)' : 'rgba(99, 102, 241, 0.4)',
        line: isDark ? 'rgba(139, 92, 246, ' : 'rgba(99, 102, 241, '
      };
    };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getColors();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce boundaries
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const lineOpacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${colors.line}${lineOpacity * 0.25})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (canvas && container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-[100svh] flex items-center py-10 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Nebula Backdrop Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Network background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center md:flex-row md:items-center gap-6 sm:gap-8 md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-gray-800 dark:text-white leading-tight">
              Hi, I'm <br />
              <span className="gradient-text font-extrabold">{personalInfo.name}</span>
            </h1>
            
            {/* Typewriter element */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 text-gray-700 dark:text-gray-200 min-h-[40px]">
              <span className="border-r-4 border-blue-500 pr-1">{displayText}</span>
            </h2>

            <p className="text-base sm:text-lg mb-6 md:mb-8 text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed">
              I build exceptional digital experiences with modern technologies.
              Passionate about creating solutions that make an impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 md:mb-8">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="whitespace-nowrap px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors duration-300 glow"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="whitespace-nowrap px-6 py-3 border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 dark:hover:bg-blue-600 rounded-lg font-medium transition-all flex items-center"
              >
                <i className="fas fa-eye mr-2"></i> View Work
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href={`https://github.com/${personalInfo.github.replace('github.com/', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all duration-300"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href={`https://www.linkedin.com/in/${personalInfo.linkedin.replace('linkedin.com/in/', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all duration-300"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a
                href={`https://www.facebook.com/${personalInfo.facebook.replace('facebook.com/', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all duration-300"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a
                href={`https://www.instagram.com/${personalInfo.instagram.replace('instagram.com/', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all duration-300"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Profile Image with spinning gradient border ring */}
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0 aspect-square floating group">
              {/* Spinning gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-spin-slow opacity-80 blur-[1px] group-hover:opacity-100 transition-opacity duration-300 shadow-lg"></div>
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white dark:bg-gray-900 border-2 border-white dark:border-gray-800 shadow-xl">
                <img
                  src={personalInfo.avatar}
                  alt={`${personalInfo.name} - Software Engineer`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { Hero };
