import { FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socials = [
  {
    icon: <FaGithub />,
    href: 'https://github.com/surajskrv',
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin />,
    href: 'https://linkedin.com/in/surajskrv',
    label: 'LinkedIn',
  },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Footer() {
  return (
    <footer className="w-full py-6 px-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} Sam. All rights reserved.
      </div>
      <div className="flex gap-4 items-center">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-xl transition"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
        <motion.button
          whileTap={{ scale: 0.85, rotate: -20 }}
          whileHover={{ scale: 1.15 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-indigo-500 text-indigo-600 dark:text-indigo-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FaArrowUp size={18} />
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;