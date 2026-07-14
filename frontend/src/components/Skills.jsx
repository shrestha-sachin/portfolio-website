import React from 'react';
import { skills } from '../data';

export default function Skills() {
  const skillCards = [
    {
      title: "Frontend Development",
      icon: "fab fa-react",
      content: "React, HTML, CSS, JavaScript, TypeScript, TailwindCSS"
    },
    {
      title: "Backend Development",
      icon: "fas fa-server",
      content: "Node.js, Django, Flask, REST APIs"
    },
    {
      title: "Database Management",
      icon: "fas fa-database",
      content: "MySQL, PostgreSQL, SQLite"
    },
    {
      title: "DevOps & Cloud",
      icon: "fas fa-cloud",
      content: "Docker, AWS, GCP, CI/CD, GitHub Actions"
    },
    {
      title: "Mobile Development",
      icon: "fas fa-mobile-alt",
      content: "React Native"
    },
    {
      title: "UI/UX Design",
      icon: "fas fa-paint-brush",
      content: "Figma, Adobe XD"
    },
    {
      title: "Graphic Designing",
      icon: "fas fa-vial",
      content: "Adobe Photoshop, Illustrator, Canva"
    },
    {
      title: "Other Skills",
      icon: "fas fa-cogs",
      content: "Git, SEO, Web Security, Microsoft Azure AI, Active Directory"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            My <span className="gradient-text font-extrabold">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            I've worked with a variety of technologies in the software engineering world. Here are some of my core competencies.
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillCards.map((card, idx) => (
            <div
              key={idx}
              className="skill-card bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all cursor-pointer h-full"
            >
              <div className="text-blue-500 dark:text-blue-400 text-4xl mb-4">
                <i className={card.icon}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {card.content}
              </p>
            </div>
          ))}
        </div>

        {/* Skill Levels Progress Bars */}
        <div className="mt-16">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-xl shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
              Programming Languages Proficiency
            </h3>
            <div className="space-y-5">
              {skills.languages.map((lang, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{lang.name}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{lang.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: lang.level }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { Skills };
