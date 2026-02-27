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
      // Show button after scrolling past first viewport
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="relative w-full bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200/50 dark:border-white/5">
      {/* Wave SVG Divider */}
      <div className="absolute -top-px left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
          <path
            d="M0,30 C200,50 400,10 600,30 C800,50 1000,10 1200,30 L1200,0 L0,0 Z"
            className="fill-white dark:fill-gray-950"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Social Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-display font-semibold text-gray-800 dark:text-gray-200 mb-3">Connect with me</h3>
            <div className="flex gap-3 justify-center md:justify-start">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-white/5 shadow-sm hover:shadow-md text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 border border-gray-200/60 dark:border-white/5 hover:border-indigo-300/50 dark:hover:border-indigo-500/30"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={s.label}
                >
                  <span className="text-lg">{s.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-display font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Links</h3>
            <ul className="space-y-1.5">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1.5 text-sm"
                  >
                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-4" />

        {/* Made with Love Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-2"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              <FaHeart className="text-sm" />
            </motion.div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">by</span>
            <span className="font-display font-bold gradient-text text-sm">Suraj</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Suraj Kumar. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.85 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-400/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 z-40"
          >
            <FaArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;