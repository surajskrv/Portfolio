import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGraduationCap, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

const whoIAmText = `
I am a passionate and results-driven Full Stack Developer with hands-on experience building modern, scalable web applications. My core expertise lies in the MERN stack (MongoDB, Express.js, React, Node.js), along with proficiency in Flask and Vue.js for backend and frontend development. Beyond coding, I value clear communication, problem-solving, and staying curious. Whether I am working solo or in a team, I always aim to deliver thoughtful, user-focused solutions that make a measurable impact.
`;

const keyStrengths = [
  'Problem Solving',
  'Team Collaboration', 
  'Creative Thinking',
  'Quick Learning',
  'Attention to Detail',
  'Time Management',
];

// Update this link with your actual certification URL
const certificationLink = "https://certificates.knowledgehut.com/7bdc037b-caf9-41f3-ad32-d2fbe371c9c4-UG%20Non%20GGU%20Course%20completion-KH12-8009000-20250105005.jpeg";

function About() {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Main Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-4">About Me</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Who I Am */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {whoIAmText}
            </p>
          </div>

          {/* Key Strengths */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Key Strengths</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keyStrengths.map((strength) => (
                <div key={strength} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-600 dark:text-gray-300">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Education</h3>
            <div className="space-y-4">
              {/* Diploma */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaGraduationCap className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">Diploma in Programming</h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-1">IIT Madras</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Chennai, India</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Comprehensive programming foundation with focus on modern development practices
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificate */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaCertificate className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">Full-Stack (MERN) Development</h4>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">KnowledgeHut UpGrad</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Bootcamp</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Intensive training in MongoDB, Express.js, React, and Node.js for full-stack development
                    </p>
                    <a
                      href={certificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors"
                    >
                      View Certificate
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;