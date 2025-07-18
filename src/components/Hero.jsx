import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] w-full text-center select-none">
      <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
        >
        Hi, I'm{' '}
        <span className="gradient-text">Suraj Kumar</span>
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-2"
      >
        Full Stack Developer
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8 text-base sm:text-lg"
      >
        Building modern, scalable, and beautiful web applications with passion and precision.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
      >
        <a
          href="/Resume.pdf"
          download
          className="px-6 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow transition"
        >
          Download Resume
        </a>
        <a
          href="#about"
          className="px-6 py-2 rounded border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white font-semibold shadow transition"
        >
          Learn More
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="flex gap-6 justify-center"
      >
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-400 text-2xl transition"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-400 text-2xl transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </motion.div>
    </section>
  );
}

export default Hero;