import React from 'react';
import { education } from '../data';

export default function Education() {
  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          My <span className="gradient-text font-extrabold">Education</span>
        </h2>

        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-8 relative">
            {education.map((item, idx) => (
              <div key={idx} className="timeline-item relative pl-10">
                {/* Timeline Icon Node */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md z-10">
                  <i className={idx === 3 ? "fas fa-school" : idx === 2 ? "fas fa-university" : "fas fa-graduation-cap"}></i>
                </div>
                
                {/* Timeline Content Card */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item.link !== '#' ? (
                        <a href={item.link} target="_blank" rel="noreferrer">
                          {item.institution}
                        </a>
                      ) : (
                        item.institution
                      )}
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1 md:mt-0">
                      {item.period}
                    </span>
                  </div>
                  
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {item.degree} — {item.location}
                  </p>
                  
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 list-disc pl-5">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export { Education };
