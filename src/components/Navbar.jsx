import { useCallback, useState, useEffect, useRef, memo } from 'react';
import { FaMoon, FaSun, FaPalette } from 'react-icons/fa';
import { gsap } from '../utils/gsap';

const navLinks = [
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

const accentThemes = [
  { name: 'Indigo', id: 'theme-indigo', color: 'bg-indigo-600 dark:bg-indigo-400', hex: '#4f46e5' },
  { name: 'Emerald', id: 'theme-emerald', color: 'bg-emerald-600 dark:bg-emerald-400', hex: '#059669' },
  { name: 'Violet', id: 'theme-violet', color: 'bg-violet-600 dark:bg-violet-400', hex: '#7c3aed' },
  { name: 'Rose', id: 'theme-rose', color: 'bg-rose-600 dark:bg-rose-400', hex: '#e11d48' },
  { name: 'Amber', id: 'theme-amber', color: 'bg-amber-600 dark:bg-amber-400', hex: '#d97706' },
];

const Navbar = memo(function Navbar({ darkMode, setDarkMode, accentTheme, setAccentTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isAccentOpen, setIsAccentOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const accentRef = useRef(null);
  const progressBarRef = useRef(null);

  // Active section tracking via IntersectionObserver (polls for lazy-loaded sections)
  useEffect(() => {
    let observer;
    let timeoutId;

    const setupObserver = () => {
      const sections = navLinks.map(l => document.getElementById(l.href)).filter(Boolean);
      
      if (sections.length < navLinks.length) {
        timeoutId = setTimeout(setupObserver, 300);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      sections.forEach(s => observer.observe(s));
    };

    setupObserver();

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Smooth scroll to section
  const scrollTo = useCallback((href) => {
    const el = document.getElementById(href);
    if (el) {
      const navbarHeight = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  }, []);

  // Click outside to close accent theme selector
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (accentRef.current && !accentRef.current.contains(e.target)) {
        setIsAccentOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Scroll detection & progress tracking (optimized DOM-updates to bypass React re-renders)
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(prev => prev !== isScrolled ? isScrolled : prev);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0 && progressBarRef.current) {
        progressBarRef.current.style.width = `${(window.scrollY / totalHeight) * 100}%`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    const el = mobileMenuRef.current;

    if (isMenuOpen) {
      gsap.set(el, { display: 'flex' });
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => gsap.set(el, { display: 'none' }),
      });
    }
  }, [isMenuOpen]);

  const handleDarkModeToggle = useCallback((e) => {
    const btn = e.currentTarget;
    gsap.fromTo(btn,
      { scale: 1, rotation: 0 },
      { scale: 0.85, rotation: 180, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 }
    );
    setDarkMode();
  }, [setDarkMode]);

  return (
    <nav
      ref={navRef}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'py-1' : 'py-0'}`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent overflow-hidden pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-accent via-purple-500 to-pink-500 transition-all duration-75"
          style={{ width: '0%' }}
        />
      </div>

      <div className="mx-4 sm:mx-6 mt-3">
        <div className={`glass rounded-2xl transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
          <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-5">
            {/* Logo */}
            <button onClick={scrollToTop}
              className="font-display font-extrabold text-xl tracking-tight cursor-pointer group bg-transparent border-none">
              <span className="text-gray-900 dark:text-white group-hover:text-accent transition-colors duration-300">SK</span>
              <span className="text-accent text-2xl leading-none">.</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-white/[0.04] rounded-xl p-1">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`cursor-pointer transition-all duration-300 font-medium px-4 py-1.5 rounded-lg text-[13px] border-none bg-transparent
                    ${activeSection === link.href
                      ? 'text-accent bg-white dark:bg-white/10 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                    }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Accent Color Dropdown */}
              <div ref={accentRef} className="relative">
                <button
                  aria-label="Select accent theme"
                  onClick={() => setIsAccentOpen(o => !o)}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer border-none"
                >
                  <FaPalette size={14} className="text-accent" />
                </button>
                {isAccentOpen && (
                  <div className="absolute right-0 mt-2 p-2 rounded-2xl glass border border-gray-200/50 dark:border-white/5 shadow-xl flex flex-col gap-1 z-50 min-w-[130px] overflow-hidden">
                    {accentThemes.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setAccentTheme(theme.id);
                          setIsAccentOpen(false);
                        }}
                        className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-none bg-transparent cursor-pointer text-left
                          ${accentTheme === theme.id ? 'text-accent' : 'text-gray-600 dark:text-gray-300'}`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${theme.color} border border-black/10 dark:border-white/10`} />
                        {theme.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                aria-label="Toggle Dark Mode"
                onClick={handleDarkModeToggle}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all duration-200 shadow-sm cursor-pointer border-none"
              >
                {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>

              <button
                className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all shadow-sm cursor-pointer border-none"
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

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className="overflow-hidden md:hidden border-t border-gray-100 dark:border-white/5 flex-col gap-1 py-3 px-4"
            style={{ display: 'none', height: 0 }}
          >
            {navLinks.map(link => (
              <button key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`cursor-pointer w-full text-center hover:text-accent hover:bg-accent-light dark:hover:bg-accent-light-dark transition-all font-medium py-2.5 rounded-xl text-sm border-none bg-transparent
                  ${activeSection === link.href
                    ? 'text-accent'
                    : 'text-gray-600 dark:text-gray-300'
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;