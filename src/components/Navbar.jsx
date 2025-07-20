import { useCallback, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

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
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-3 sm:px-4">
        {/* Left: Site Name */}
        <ScrollLink
          to="hero"
          smooth={true}
          duration={100}
          className="font-bold text-xl tracking-tight gradient-text cursor-pointer hover:opacity-80 transition-opacity"
        >
          Suraj Kumar
        </ScrollLink>
        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <ScrollLink
              key={link.name}
              to={link.href}
              smooth={true}
              duration={100}
              offset={-64}
              spy={true}
              activeClass="text-indigo-600 dark:text-indigo-400"
              className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium px-2 py-1 rounded"
              onSetActive={handleSetActive}
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>
        {/* Mobile: Hamburger Button */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setIsMenuOpen(open => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            // Close icon (X)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        {/* Right: Theme Toggle */}
        <button
          aria-label="Toggle Dark Mode"
          onClick={() => setDarkMode(dm => !dm)}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-40 bg-white/95 dark:bg-gray-950/95 shadow-lg border-b border-gray-200 dark:border-gray-800 md:hidden flex flex-col items-center gap-2 pb-4 animate-fade-in">
          {navLinks.map(link => (
            <ScrollLink
              key={link.name}
              to={link.href}
              smooth={true}
              duration={120}
              offset={-64}
              spy={true}
              activeClass="text-indigo-600 dark:text-indigo-400"
              className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium px-2 py-1 rounded text-lg"
              onSetActive={() => setIsMenuOpen(false)}
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;