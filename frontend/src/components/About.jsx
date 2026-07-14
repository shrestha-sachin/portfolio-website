import React from 'react';
import { personalInfo } from '../data';

export default function About() {
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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          About <span className="gradient-text font-extrabold">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Professional Headshot */}
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 flex-shrink-0 aspect-square rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg floating">
              <img
                src="./Resources/Images/profile2.jpg"
                alt="Sachin Shrestha - Professional Headshot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio Text */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Who am I?</h3>
            <div className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed space-y-4">
              <p>
                I am a rising senior studying Computer Science with an emphasis on Artificial Intelligence at the University of Wisconsin-Green Bay. As the Founder and President of the Google Developer Group and the lead organizer for HackGB, I am highly dedicated to building a collaborative student tech community. This summer, I am working as a Data Engineering Intern at Faith Technologies.
              </p>
              <p>
                My technical interests span agentic AI, automation, and full-stack development, often blended with my passion for graphic design to create user-friendly experiences. Academically, I have a strong interest in research—particularly in computer vision—to solve real-world problems. Beyond coding, I am an avid traveler and outdoor enthusiast who loves hiking and seeking new thrill-seeking adventures, like skydiving from 10,000 feet.
              </p>
            </div>

            {/* Structured Info Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/30 flex items-center gap-4 hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">Name</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{personalInfo.name}</p>
                </div>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/30 flex items-center gap-4 hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">Location</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{personalInfo.address}</p>
                </div>
              </div>

              <div className="p-4 bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/30 flex items-center gap-4 hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all duration-300 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 transition-colors block truncate">{personalInfo.email}</a>
                </div>
              </div>

              <div className="p-4 bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/30 flex items-center gap-4 hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">Experience</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">2+ Years</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="./Resources/Resume/Resume_Sachin_Full.pdf"
                download="Sachin_Shrestha_Resume.pdf"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors glow shadow-lg flex items-center"
              >
                <i className="fas fa-download mr-2"></i> Download Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 dark:hover:bg-blue-600 px-6 py-3 rounded-lg font-medium transition-all flex items-center"
              >
                <i className="fas fa-paper-plane mr-2"></i> Hire Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { About };
