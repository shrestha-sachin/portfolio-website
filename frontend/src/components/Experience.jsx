import React from 'react';
import { experience } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Work <span className="gradient-text font-extrabold">Experience</span>
        </h2>

        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-8 relative">
            {experience.map((item, idx) => (
              <div key={idx} className="timeline-item relative pl-10">
                {/* Timeline Icon Node */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md z-10">
                  <i className={item.icon || "fas fa-briefcase"}></i>
                </div>
                
                {/* Timeline Content Card */}
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {item.role}
                    </h3>
                    <span className="text-gray-500 dark:text-gray-300 text-sm font-medium mt-1 md:mt-0">
                      {item.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-200 font-medium mb-3">
                    {item.company}, {item.location}
                  </p>
                  
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-4 list-disc pl-5">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Skills/Tags Badge Grid */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full border border-blue-100/50 dark:border-blue-900/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export { Experience };
