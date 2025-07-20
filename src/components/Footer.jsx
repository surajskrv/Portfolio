import { FaGithub, FaLinkedin, FaArrowUp, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const socials = [
  {
    icon: <FaGithub />,
    href: 'https://github.com/surajskrv',
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin />,
    href: 'https://linkedin.com/in/surajskr',
    label: 'LinkedIn',
  },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = 200; // Reduced footer height
      
      // Show button when user is near the footer
      if (scrollPosition >= documentHeight - footerHeight) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Social Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Connect with me</h3>
            <div className="flex gap-3 justify-center md:justify-start">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Links</h3>
            <ul className="space-y-1">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 hover:translate-x-1 inline-block text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Made with Love Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-3 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              <FaHeart />
            </motion.div>
            <span className="text-gray-600 dark:text-gray-300 text-sm">by</span>
            <span className="font-bold gradient-text text-sm">Suraj</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Suraj Kumar. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button - Only shows when near footer */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileTap={{ scale: 0.85, rotate: -20 }}
            whileHover={{ scale: 1.15 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-40"
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;