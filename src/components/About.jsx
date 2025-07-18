import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const profileText = `
I am a passionate Full Stack Developer with experience building scalable web applications using modern technologies. I love solving complex problems and delivering high-quality, user-friendly solutions. My expertise spans both frontend and backend, and I thrive in collaborative, fast-paced environments.`;

function About() {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        controls.start({ opacity: 1, x: 0 });
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: 80 }}
      animate={controls}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-2 md:px-8"
    >
      {/* Left: Text */}
      <div className="flex-1 text-left">
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {profileText}
        </p>
      </div>
      {/* Right: SVG Illustration/Portrait */}
      <div className="flex-1 flex items-center justify-center">
        {/* SVG illustration placeholder */}
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="90" r="90" fill="#6366F1" />
          <ellipse cx="90" cy="80" rx="40" ry="50" fill="#fff" />
          <ellipse cx="90" cy="70" rx="18" ry="20" fill="#6366F1" />
          <rect x="60" y="120" width="60" height="20" rx="10" fill="#fff" />
        </svg>
      </div>
    </motion.section>
  );
}

export default About;