import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const handleResumeDownload = () => {
  try {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Suraj_Kumar_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    console.error('Download failed:', error);
    window.open('/Resume.pdf', '_blank');
  }
};

const roles = [
  "Full Stack Developer",
  "MERN Specialist",
  "AI Enthusiast",
  "Flask Developer",
  "Vue.js Builder",
];

function TypingEffect() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, isDeleting ? text.length - 1 : text.length + 1));
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="inline-block min-w-[200px]">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[1.1em] bg-indigo-600 dark:bg-indigo-400 ml-0.5 align-middle"
      />
    </span>
  );
}

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center select-none overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 via-white to-indigo-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 mesh-gradient"></div>
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] dark:opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #a5b4fc 0%, transparent 70%)', top: '-10%', right: '-10%' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.07] dark:opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)', bottom: '10%', left: '-5%' }}
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full opacity-[0.05] dark:opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #f9a8d4 0%, transparent 70%)', top: '40%', left: '50%' }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'w-1.5 h-1.5 bg-indigo-400' : i % 3 === 1 ? 'w-1 h-1 bg-purple-400' : 'w-2 h-2 bg-pink-300'} dark:opacity-30 opacity-20`}
            animate={{
              x: [0, (i % 2 === 0 ? 1 : -1) * (60 + i * 10), 0],
              y: [0, -80 - i * 8, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            style={{
              left: `${8 + i * 7.5}%`,
              top: `${20 + (i % 4) * 18}%`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 text-base sm:text-lg px-5 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-200/50 dark:border-indigo-700/30">
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block origin-[70%_70%]"
            >
              👋
            </motion.span>
            Hello, I'm
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold mb-4 tracking-tight"
        >
          <span className="gradient-text">Suraj Kumar</span>
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl text-indigo-600 dark:text-indigo-300 font-medium mb-6 font-display"
        >
          <TypingEffect />
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed"
        >
          Building scalable, user-friendly web apps with modern tech like React, Flask, and Node.js. I love crafting clean, efficient solutions to complex problems — turning ideas into fast, modern web experiences.
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
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold rounded-full shadow-lg hover:shadow-indigo-400/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <FaDownload className="relative z-10 group-hover:animate-bounce" />
            <span className="relative z-10">Download Resume</span>
          </motion.button>
          <motion.a
            href="#about"
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
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
          className="flex gap-4 justify-center"
        >
          {[
            { Icon: FaGithub, href: 'https://github.com/surajskrv', label: 'GitHub' },
            { Icon: FaLinkedin, href: 'https://linkedin.com/in/surajskr', label: 'LinkedIn' },
          ].map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 border border-gray-200/50 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/50"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
            >
              <Icon className="text-2xl" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1 bg-current rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Hero;