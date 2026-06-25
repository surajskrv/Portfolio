import { FaGithub, FaLinkedin, FaArrowUp, FaHeart } from 'react-icons/fa';
import { useState, useEffect, memo } from 'react';

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/surajskrv', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/surajskr', label: 'LinkedIn' },
];

const Footer = memo(function Footer({ cursorEnabled, setCursorEnabled }) {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handler = () => {
      const shouldShow = window.scrollY > window.innerHeight * 0.5;
      setShowBtn(prev => prev !== shouldShow ? shouldShow : prev);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Logo & Socials */}
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

          {/* Middle: Heart tag */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            Built with
            <span className="text-rose-500 inline-flex animate-heart-pulse">
              <FaHeart className="text-[10px]" />
            </span>
            by <span className="font-bold gradient-text">Suraj</span>
          </div>

          {/* Right-Middle: Custom Cursor Toggle Switch */}
          <div className="flex items-center gap-2 select-none">
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Custom Cursor</span>
            <button
              role="switch"
              aria-checked={cursorEnabled}
              onClick={() => setCursorEnabled?.(prev => !prev)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out border-none cursor-pointer flex items-center relative
                ${cursorEnabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-800'}`}
              aria-label="Toggle custom cursor"
            >
              <span
                className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out inline-block
                  ${cursorEnabled ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
          </div>

          {/* Right: Copyright */}
          <p className="text-xs text-gray-500 dark:text-gray-500">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>

      {/* Scroll to top button — CSS-only transition */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 p-3 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-all duration-300 z-40
          ${showBtn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90 pointer-events-none'}`}
      >
        <FaArrowUp size={14} />
      </button>
    </footer>
  );
});

export default Footer;