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
    <div className="bg-white text-black dark:bg-gray-950 dark:text-gray-100 min-h-screen w-full font-sans scroll-smooth m-0 p-0 overflow-x-hidden">
      <Helmet>
        <html lang="en" />
        <title>Suraj-Portfolio</title>
        <meta name="description" content="Portfolio of a Full Stack Developer: projects, skills, resume, and contact info." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex flex-col items-center justify-center w-full overflow-x-hidden pt-16">
        <section id="hero" className="w-full"><Hero /></section>
        <section id="about" className="w-full py-8 bg-white dark:bg-gray-950"><About /></section>
        <section id="skills" className="w-full py-8 bg-gray-50 dark:bg-gray-900"><Skills /></section>
        <section id="projects" className="w-full py-8 bg-white dark:bg-gray-950"><Projects /></section>
        <section id="contact" className="w-full py-8 bg-gray-50 dark:bg-gray-900"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
