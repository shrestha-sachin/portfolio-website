import React from 'react';
import { leadership } from '../data';

export default function Leadership() {
  return (
    <section id="leadership" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Leadership & <span className="gradient-text font-extrabold">Activities</span>
        </h2>

        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-8 relative">
            {leadership.map((item, idx) => (
              <div key={idx} className="timeline-item relative pl-10">
                {/* Timeline Icon Node */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md z-10">
                  <i className={item.icon || "fas fa-users"}></i>
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
                    {item.organization}, {item.location}
                  </p>
                  
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 list-disc pl-5">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Action Link Buttons */}
                  {(item.link || item.hackgb) && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg transition-colors border border-blue-100 dark:border-blue-800/30"
                        >
                          <i className="fas fa-external-link-alt mr-1.5"></i> Visit Website
                        </a>
                      )}
                      {item.hackgb && (
                        <a
                          href={item.hackgb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg transition-colors border border-purple-100 dark:border-purple-800/30"
                        >
                          <i className="fas fa-external-link-alt mr-1.5"></i> HackGB Website
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export { Leadership };
