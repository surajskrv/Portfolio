import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 80 },
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

const USE_LOCAL_DATA = true;

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

// Shimmer skeleton card
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-200/60 dark:border-white/5 overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="h-6 w-2/3 rounded-lg shimmer" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded shimmer" />
          <div className="h-3 w-5/6 rounded shimmer" />
          <div className="h-3 w-4/6 rounded shimmer" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 rounded-full shimmer" />
          <div className="h-6 w-16 rounded-full shimmer" />
          <div className="h-6 w-16 rounded-full shimmer" />
        </div>
      </div>
      <div className="p-4 border-t border-gray-200/60 dark:border-white/5 flex gap-3">
        <div className="h-9 flex-1 rounded-lg shimmer" />
        <div className="h-9 flex-1 rounded-lg shimmer" />
      </div>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      if (USE_LOCAL_DATA) {
        setTimeout(() => {
            setProjects(fallbackProjects);
            setUsingFallback(true);
            setLoading(false);
        }, 600);
        return;
      }

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
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-display font-bold gradient-text mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto">
          Here are some of my recent projects showcasing my skills in web development.
        </p>
      </motion.div>

      {/* Conditional Rendering: Skeleton vs Grid */}
      {loading ? (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
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
              className="group relative bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/60 dark:border-white/5 overflow-hidden transition-all duration-500 hover:border-indigo-300/50 dark:hover:border-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/5"
            >
              {/* Gradient top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Project Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-display font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {project.title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="text-xs" />
                      <span className="font-medium text-gray-500 dark:text-gray-400">{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-500">
                      <FaCodeBranch className="text-xs" />
                      <span className="font-medium text-gray-500 dark:text-gray-400">{project.forks}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Project Tags */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.language.slice(0, 3).map((lang) => (
                    <span key={lang} className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 text-xs rounded-full font-medium border border-indigo-200/50 dark:border-indigo-700/30">
                      <div className={`w-1.5 h-1.5 rounded-full ${languageColors[lang] || 'bg-gray-500'}`}></div>
                      {lang}
                    </span>
                  ))}
                  
                  {project.topics && project.topics.slice(0, 2).map((topic) => (
                    <span key={topic} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs rounded-full border border-gray-200/50 dark:border-white/5">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Footer */}
              <div className="px-6 py-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-800 dark:bg-white/10 text-white rounded-xl hover:bg-gray-700 dark:hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                    whileHover={{ scale: 1.02, y: -1 }}
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
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md hover:shadow-indigo-400/15"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* View More Button */}
      {!loading && projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/surajskrv"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-indigo-400/15 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-lg" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      )}
    </section>
  );
}

export default Projects;