import { useCallback, useState, memo } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

const Navbar = memo(function Navbar({ darkMode, setDarkMode }) {
  const handleSetActive = useCallback(() => {}, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="fixed w-full top-0 z-50"
    >
      <div className="mx-4 sm:mx-6 mt-3">
        <div className="glass rounded-2xl">
          <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-5">
            {/* Logo */}
            <ScrollLink to="hero" smooth={true} duration={100}
              className="font-display font-extrabold text-xl tracking-tight cursor-pointer group">
              <span className="text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">SK</span>
              <span className="text-indigo-500 dark:text-indigo-400 text-2xl leading-none">.</span>
            </ScrollLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-white/[0.04] rounded-xl p-1">
              {navLinks.map(link => (
                <ScrollLink
                  key={link.name}
                  to={link.href} smooth={true} duration={100} offset={-80} spy={true}
                  activeClass="!text-indigo-600 dark:!text-indigo-400 !bg-white dark:!bg-white/10 !shadow-sm"
                  className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all duration-200 font-medium px-4 py-1.5 rounded-lg text-[13px]"
                  onSetActive={handleSetActive}
                >
                  {link.name}
                </ScrollLink>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                aria-label="Toggle Dark Mode"
                onClick={setDarkMode}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all duration-200 shadow-sm"
                whileTap={{ scale: 0.85, rotate: 180 }}
              >
                {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
              </motion.button>

              <button
                className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all shadow-sm"
                onClick={() => setIsMenuOpen(o => !o)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  {isMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden md:hidden border-t border-gray-100 dark:border-white/5"
              >
                <div className="flex flex-col gap-1 py-3 px-4">
                  {navLinks.map(link => (
                    <ScrollLink key={link.name} to={link.href} smooth={true} duration={120} offset={-80}
                      className="cursor-pointer text-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all font-medium py-2.5 rounded-xl text-sm"
                      onSetActive={() => setIsMenuOpen(false)}>
                      {link.name}
                    </ScrollLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
});

export default Navbar;