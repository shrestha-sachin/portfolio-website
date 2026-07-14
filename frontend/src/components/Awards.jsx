import React from 'react';
import { awards } from '../data';

export default function Awards() {
  return (
    <section id="awards" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Honors & <span className="gradient-text font-extrabold">Awards</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Recognitions, academic scholarships, and hackathon victories achieved throughout my academic journey.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100/50 dark:border-blue-900/20 text-xl">
                <i className={award.icon || "fas fa-trophy"}></i>
              </div>

              {/* Text Body */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 leading-snug">
                  {award.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export { Awards };
