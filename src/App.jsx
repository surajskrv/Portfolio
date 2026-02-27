import { lazy, Suspense, useState, useEffect, useCallback, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const Loader = memo(() => (
  <div className="w-full py-24 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-indigo-200 dark:border-indigo-800 border-t-indigo-500 rounded-full animate-spin" />
  </div>
));
Loader.displayName = 'Loader';

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const toggleDarkMode = useCallback(() => setDarkMode(dm => !dm), []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen w-full font-sans scroll-smooth m-0 p-0 overflow-x-hidden
      bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100
      selection:bg-indigo-100 selection:text-indigo-700 dark:selection:bg-indigo-900/50 dark:selection:text-indigo-300`}>
      <Helmet>
        <html lang="en" />
        <title>Suraj Kumar — Full Stack Developer</title>
        <meta name="description" content="Portfolio of Suraj Kumar — Full Stack Developer specializing in React, Node.js, Flask, Vue.js, and MongoDB." />
      </Helmet>
      <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} />
      <main className="flex flex-col w-full overflow-x-hidden">
        <section id="hero" className="w-full"><Hero /></section>

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
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
