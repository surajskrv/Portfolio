import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen w-full font-sans scroll-smooth m-0 p-0 overflow-x-hidden">
      <Helmet>
        <html lang="en" />
        <title>Suraj Kumar — Full Stack Developer Portfolio</title>
        <meta name="description" content="Portfolio of Suraj Kumar — Full Stack Developer specializing in React, Node.js, Flask, Vue.js, and MongoDB. View projects, skills, and get in touch." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex flex-col items-center justify-center w-full overflow-x-hidden pt-14">
        <section id="hero" className="w-full"><Hero /></section>
        
        <div className="section-divider w-full max-w-4xl mx-auto" />
        <section id="about" className="w-full py-4 bg-white dark:bg-gray-950"><About /></section>
        
        <div className="section-divider w-full max-w-4xl mx-auto" />
        <section id="skills" className="w-full py-4 bg-gray-50/50 dark:bg-gray-900/30"><Skills /></section>
        
        <div className="section-divider w-full max-w-4xl mx-auto" />
        <section id="projects" className="w-full py-4 bg-white dark:bg-gray-950"><Projects /></section>
        
        <div className="section-divider w-full max-w-4xl mx-auto" />
        <section id="contact" className="w-full py-4 bg-gray-50/50 dark:bg-gray-900/30"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
