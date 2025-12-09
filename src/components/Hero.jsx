import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown } from 'react-icons/fa';

const handleResumeDownload = () => {
  try {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Suraj_Kumar_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    // Small delay to ensure the download starts
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: open in new tab
    window.open('/Resume.pdf', '_blank');
  }
};

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center select-none overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400 dark:bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-lg sm:text-xl text-indigo-600 dark:text-orange-400 font-medium">
            👋 Hello, I'm
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="gradient-text">Suraj Kumar</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl text-indigo-600 dark:text-blue-300 font-medium mb-6"
        >
          Full Stack Developer | MERN, Flask, AI Enthusiast
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto mb-8 text-lg sm:text-xl leading-relaxed"
        >
          Building scalable, user-friendly web apps with modern tech like React, Flask, and Node.js. I love crafting clean, efficient solutions to complex problems turning ideas into fast, modern web experiences.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            onClick={handleResumeDownload}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="group-hover:animate-bounce" />
            Download Resume
          </motion.button>
          <motion.a
            href="#about"
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-indigo-600 dark:border-white text-indigo-600 dark:text-white hover:bg-indigo-600 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <FaArrowDown className="group-hover:animate-bounce" />
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex gap-6 justify-center"
        >
          <motion.a
            href="https://github.com/surajskrv"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-white dark:bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl text-gray-600 dark:text-white hover:text-indigo-600 dark:hover:text-blue-300 transition-all duration-300 border border-gray-200 dark:border-white/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="GitHub"
          >
            <FaGithub className="text-2xl group-hover:animate-pulse" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/surajskr"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-white dark:bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl text-gray-600 dark:text-white hover:text-indigo-600 dark:hover:text-blue-300 transition-all duration-300 border border-gray-200 dark:border-white/20"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-2xl group-hover:animate-pulse" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;