import { FaGithub, FaLinkedin, FaArrowUp, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, memo } from 'react';

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/surajskrv', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/surajskr', label: 'LinkedIn' },
];

const Footer = memo(function Footer() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handler = () => setShowBtn(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-display font-extrabold text-lg text-gray-900 dark:text-white">SK<span className="text-indigo-500">.</span></span>
            <div className="flex gap-1">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200"
                  aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            Built with
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-rose-500 inline-flex">
              <FaHeart className="text-[10px]" />
            </motion.span>
            by <span className="font-bold gradient-text">Suraj</span>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>

      <AnimatePresence>
        {showBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 p-3 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-colors z-40"
          >
            <FaArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
});

export default Footer;