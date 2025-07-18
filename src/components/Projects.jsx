import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Add your projects here
const projects = [
  {
    title: 'Portfolio Website',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    description: 'A personal portfolio website to showcase my work, skills, and contact info.',
    github: 'https://github.com/your-github/portfolio',
    demo: 'https://your-portfolio-demo.com',
  },
  {
    title: 'Blog Platform',
    tech: ['Flask', 'Python', 'SQLite'],
    description: 'A full-featured blog platform with authentication, CRUD, and responsive design.',
    github: 'https://github.com/your-github/blog-platform',
    demo: '',
  },
  // Add more projects as needed
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.5, type: 'spring' },
  }),
};

function Projects() {
  return (
    <section className="w-full section-padding">
      <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Projects</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="card flex flex-col"
          >
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((tech) => (
                <span key={tech} className="bg-indigo-100 dark:bg-indigo-700/20 text-indigo-600 dark:text-indigo-300 text-xs px-2 py-1 rounded font-medium">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-800 dark:text-gray-300 mb-4 flex-1">{project.description}</p>
            <div className="flex gap-4 mt-auto">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-lg"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-lg"
                  aria-label="Demo"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm">To add a project, edit the <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">projects</span> array in <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Projects.jsx</span>.</p>
    </section>
  );
}

export default Projects;