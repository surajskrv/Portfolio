import { lazy, Suspense, useState, useEffect, useCallback, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import { ScrollTrigger } from './utils/gsap';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const NotFound = lazy(() => import('./components/NotFound'));

const Loader = memo(() => (
  <div className="w-full py-32 flex flex-col items-center justify-center gap-4">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 border-2 border-accent/25 dark:border-accent/10 rounded-full" />
      <div className="absolute inset-0 border-2 border-t-accent rounded-full animate-spin" />
    </div>
    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 animate-pulse">Loading Section...</span>
  </div>
));
Loader.displayName = 'Loader';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark-mode');
    return saved === 'true'; // Default to false (light mode)
  });
  const toggleDarkMode = useCallback(() => {
    setDarkMode(dm => {
      const next = !dm;
      localStorage.setItem('dark-mode', String(next));
      return next;
    });
  }, []);

  const [accentTheme, setAccentTheme] = useState(() =>
    localStorage.getItem('accent-theme') || 'theme-rose'
  );

  const changeAccentTheme = useCallback((theme) => {
    setAccentTheme(theme);
    localStorage.setItem('accent-theme', theme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const themes = ['theme-indigo', 'theme-emerald', 'theme-violet', 'theme-rose', 'theme-amber'];
    themes.forEach((t) => document.documentElement.classList.remove(t));
    document.documentElement.classList.add(accentTheme);
  }, [accentTheme]);

  const [cursorEnabled, setCursorEnabled] = useState(() =>
    localStorage.getItem('cursor-enabled') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('cursor-enabled', cursorEnabled);
  }, [cursorEnabled]);

  // Client-side routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      // Refresh scroll animations
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Refresh ScrollTrigger on full page load
  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const isNotFound = currentPath !== '/' && currentPath !== '/index.html';

  if (isNotFound) {
    return (
      <div className="min-h-screen w-full font-sans m-0 p-0 overflow-x-hidden bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100">
        <Helmet>
          <html lang="en" />
          <title>Page Not Found — Suraj Kumar</title>
          <meta name="description" content="The page you are looking for does not exist." />
        </Helmet>
        {cursorEnabled && <CustomCursor />}
        <Suspense fallback={<Loader />}>
          <NotFound />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-sans m-0 p-0 overflow-x-hidden bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <Helmet>
        <html lang="en" />
        <title>Suraj Kumar | Full Stack Developer & Python Engineer Portfolio</title>
        <meta name="description" content="Portfolio of Suraj Kumar — Full Stack Developer, Python Software Engineer, and MERN Developer specializing in React, Node.js, Flask, Vue.js, SQL, and MongoDB. View projects, skills, and get in touch." />
        <meta name="keywords" content="Suraj Kumar, Full Stack Developer, Python Developer, MERN Developer, Web Developer Portfolio, React, Node.js, Flask, Vue.js, IIT Madras, surajskrv" />
      </Helmet>
      {cursorEnabled && <CustomCursor />}
      <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} accentTheme={accentTheme} setAccentTheme={changeAccentTheme} />
      <main className="flex flex-col w-full overflow-x-hidden">
        <section id="hero" className="w-full">
          <Hero accentTheme={accentTheme} cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled} />
        </section>

        <Suspense fallback={<Loader />}>
          <section id="about" className="w-full section-alt"><About /></section>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <section id="skills" className="w-full section-light"><Skills /></section>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <section id="projects" className="w-full section-alt"><Projects /></section>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <section id="contact" className="w-full section-light"><Contact /></section>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled} />
      </Suspense>
    </div>
  );
}

export default App;
