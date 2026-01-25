import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, type: 'spring', stiffness: 100 },
  }),
};

// Color mapping for languages
const languageColors = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-red-500',
  'C++': 'bg-pink-500',
  'C#': 'bg-purple-500',
  PHP: 'bg-indigo-500',
  Ruby: 'bg-red-600',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-500',
  HTML: 'bg-orange-600',
  CSS: 'bg-blue-600',
  SCSS: 'bg-pink-600',
  Vue: 'bg-green-600',
  Vuejs: 'bg-green-600',
  React: 'bg-blue-600',
  Tailwindcss: 'bg-blue-700',
  Express: 'bg-gray-600',
  Mongodb: 'bg-green-700',
  Flask: 'bg-gray-800',
  Bootstrap: 'bg-purple-600',
  SQL: 'bg-orange-500',
};

const USE_LOCAL_DATA = true; // Toggle this: true = Local, false = API

const fallbackProjects = [
  {
    id: 1,
    title: 'WheelSpot',
    description: 'A modern, full-stack parking management application built with Flask, Vue.js, and Celery. Real-time parking spot booking, admin control, automated reports, and beautiful email notifications.',
    github: 'https://github.com/surajskrv/WheelSpot',
    demo: 'https://wheelspot.onrender.com/',
    stars: 0,
    forks: 0,
    language: ['Vuejs', 'Flask', 'JavaScript', 'Bootstrap', 'SQL'],
    topics: ['parking-system', 'full-stack']
  },
  {
    id: 2,
    title: 'Curanet',
    description: 'CuraNet is comprehensive Hospital Management System featuring role-based access control for Admins, Doctors, and Patients. Built with a modern stack using Vue 3 (Vite), Flask, SQLite, and Bootstrap 5.',
    github: 'https://github.com/surajskrv/CuraNet',
    demo: 'https://cura-net.vercel.app/',
    stars: 0,
    forks: 0,
    language: ['Flask', 'Vuejs', 'JavaScript', 'SQL'],
    topics: ['hospital-management', 'vue3']
  },
  {
    id: 3,
    title: 'Flixxit',
    description: 'Flixxit aims to be a web application with the likeness and basic feature set of OTT platforms such as Netflix, Prime Video and AppleTV+.',
    github: 'https://github.com/surajskrv/Flixxit',
    demo: 'https://flixxit-00r6.onrender.com/',
    stars: 0,
    forks: 0,
    language: ['React', 'Express', 'JavaScript', 'Mongodb'],
    topics: ['streaming', 'react']
  },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Note: 'usingFallback' isn't used in UI currently, but good for debugging
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      // 1. Check local configuration
      if (USE_LOCAL_DATA) {
        setTimeout(() => {
            setProjects(fallbackProjects);
            setUsingFallback(true);
            setLoading(false);
        }, 300);
        return;
      }

      // 2. Fetch from GitHub
      try {
        console.log("Mode: Online Fetch");
        const response = await fetch('https://api.github.com/users/surajskrv/repos?sort=updated&per_page=10');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const repos = await response.json();
        
        const filteredRepos = repos
          .filter(repo => !repo.fork && repo.description && repo.name !== 'Portfolio')
          .map(repo => ({
            id: repo.id,
            title: repo.name,
            description: repo.description,
            github: repo.html_url,
            demo: repo.homepage || '',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            // Normalize language to always be an Array
            language: repo.language ? [repo.language] : [],
            topics: repo.topics || [],
          }))
          .slice(0, 3);

        if (filteredRepos.length === 0) {
          console.warn('No valid repos found, using fallback.');
          setUsingFallback(true);
          setProjects(fallbackProjects);
        } else {
          setUsingFallback(false);
          setProjects(filteredRepos);
        }
        
      } catch (err) {
        console.error('Error fetching projects (switching to fallback):', err);
        setUsingFallback(true);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Header - Always visible to prevent layout shift */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Here are some of my recent projects showcasing my skills in web development.
        </p>
      </div>

      {/* Conditional Rendering: Loader vs Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:scale-105"
            >
              {/* Project Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <FaStar className="text-sm" />
                      <span className="font-medium">{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <FaCodeBranch className="text-sm" />
                      <span className="font-medium">{project.forks}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Project Tags */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Languages - Logic Simplified */}
                  {project.language.slice(0, 3).map((lang) => (
                    <span key={lang} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full font-medium">
                      <div className={`w-2 h-2 rounded-full ${languageColors[lang] || 'bg-gray-500'}`}></div>
                      {lang}
                    </span>
                  ))}
                  
                  {/* Topics */}
                  {project.topics && project.topics.slice(0, 2).map((topic) => (
                    <span key={topic} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub />
                    Code
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt />
                      Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* View More Button - Only shows when not loading */}
      {!loading && projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/surajskrv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <FaGithub />
            View All Projects on GitHub
          </a>
        </motion.div>
      )}
    </section>
  );
}

export default Projects;