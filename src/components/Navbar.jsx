import { useCallback, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

function Navbar({ darkMode, setDarkMode }) {
  const handleSetActive = useCallback(() => {}, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 glass border-b border-white/10 dark:border-white/5">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-3 sm:px-4">
        {/* Left: Site Name */}
        <ScrollLink
          to="hero"
          smooth={true}
          duration={100}
          className="font-display font-bold text-xl tracking-tight gradient-text cursor-pointer hover:opacity-80 transition-opacity"
        >
          Suraj Kumar
        </ScrollLink>

        {/* Center: Nav Links (for desktop) */}
        <div className="hidden md:flex gap-1 bg-gray-100/60 dark:bg-white/5 rounded-full px-1.5 py-1">
          {navLinks.map(link => (
            <ScrollLink
              key={link.name}
              to={link.href}
              smooth={true}
              duration={100}
              offset={-64}
              spy={true}
              activeClass="!bg-white dark:!bg-white/10 !text-indigo-600 dark:!text-indigo-400 shadow-sm"
              className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 font-medium px-4 py-1.5 rounded-full text-sm"
              onSetActive={handleSetActive}
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.button
            aria-label="Toggle Dark Mode"
            onClick={() => setDarkMode(dm => !dm)}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaSun size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaMoon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile: Hamburger Button */}
          <motion.button
            className="md:hidden p-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-indigo-600 dark:text-indigo-400">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden glass border-t border-white/10 dark:border-white/5"
          >
            <div className="flex flex-col items-center gap-1 py-4 px-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="w-full"
                >
                  <ScrollLink
                    to={link.href}
                    smooth={true}
                    duration={120}
                    offset={-64}
                    spy={true}
                    activeClass="!bg-indigo-50 dark:!bg-indigo-900/30 !text-indigo-600 dark:!text-indigo-400"
                    className="cursor-pointer block w-full text-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 font-medium px-4 py-2.5 rounded-xl text-base"
                    onSetActive={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </ScrollLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;