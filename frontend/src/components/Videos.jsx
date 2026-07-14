import React from 'react';
import { videos } from '../data';

export default function Videos() {
  return (
    <section id="videos" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            My <span className="gradient-text font-extrabold">Videos</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Check out walkthroughs and demonstrations of some of my projects and tutorials!
          </p>
        </div>

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, idx) => (
            <div
              key={idx}
              className="video-card bg-gray-50 dark:bg-gray-850 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-150 dark:border-gray-700/60"
            >
              {/* Aspect Ratio Container for iFrame */}
              <div className="aspect-video">
                <iframe
                  src={vid.url}
                  title={vid.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                ></iframe>
              </div>
              
              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {vid.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed min-h-[48px]">
                  {vid.description}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <i className="far fa-calendar-alt mr-1.5"></i> {vid.date}
                  </span>
                  <a
                    href={vid.watchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm font-semibold"
                  >
                    <i className="fab fa-youtube mr-1.5 text-lg text-red-600"></i> Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Channel Redirect Button */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@sachin-stha"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium transition-colors inline-flex items-center glow shadow-md"
          >
            <i className="fab fa-youtube mr-2"></i> View All Videos
          </a>
        </div>
      </div>
    </section>
  );
}
export { Videos };
