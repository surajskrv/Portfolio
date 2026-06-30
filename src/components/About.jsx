import { FaGraduationCap, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { useEffect, useRef, useState, memo } from 'react';
import { gsap } from '../utils/gsap';

const whoIAmText = `I am a passionate Full Stack Developer with hands-on experience building modern, scalable web applications. My expertise spans the MERN stack, Flask, and Vue.js — delivering thoughtful solutions that make a measurable impact.`;

const keyStrengths = [
  { name: 'Problem Solving', emoji: '🧩' },
  { name: 'Critical Thinking', emoji: '🧠' },
  { name: 'Quick Learning', emoji: '⚡' },
  { name: 'Detail-Oriented', emoji: '🔍' },
  { name: 'Adaptability', emoji: '🔄' },
  { name: 'Self-Motivated', emoji: '🚀' },
  { name: 'Goal-Driven', emoji: '🎯' },
];

const certificationLink = "https://certificates.knowledgehut.com/7bdc037b-caf9-41f3-ad32-d2fbe371c9c4-UG%20Non%20GGU%20Course%20completion-KH12-8009000-20250105005.jpeg";

const educationData = [
  { title: 'Diploma in Programming', institution: 'IIT Madras', location: 'Chennai', description: 'Programming foundation with modern development practices', icon: <FaGraduationCap />, accent: 'bg-indigo-500' },
  { title: 'MCA', institution: 'IGNOU', location: 'Patna', description: 'Advanced studies in computer applications and software development', icon: <FaGraduationCap />, accent: 'bg-purple-500' },
];

const experienceData = [
  { title: 'Full-Stack MERN Student', institution: 'KnowledgeHut UpGrad', location: 'Bootcamp', description: 'Intensive training in MongoDB, Express, React, and Node.js. Developed several full-stack capstone projects with robust APIs and state management.', icon: <FaCertificate />, accent: 'bg-amber-500', certLink: certificationLink },
  { title: 'Academic Projects & Collaboration', institution: 'Self-directed', location: 'Academic', description: 'Collaboratively engineered hospital portals and booking systems. Gained hands-on experience with database styling, Celery workers, and Vue 3.', icon: <FaCertificate />, accent: 'bg-emerald-500' },
];

const interestsData = [
  { title: 'UI/UX & Interactive Design', description: 'I love creating user experiences that are not just functional but also visually stunning, incorporating fluid animations and smooth transitions.' },
  { title: 'Automation & Scripting', description: 'Automating developer workflows, writing custom scrapers in Python, and experimenting with deployment configurations.' },
  { title: 'Data Structures & Algorithms', description: 'Honing problem-solving skills on coding platforms and studying clean software architectural patterns.' }
];

const About = memo(function About() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('education');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);
  const lightboxRef = useRef(null);
  const lightboxCloseRef = useRef(null);

  // Close lightbox on escape keypress
  useEffect(() => {
    if (!lightboxImg) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  // Focus lightbox close button when opened
  useEffect(() => {
    if (lightboxImg) {
      setImgLoading(true);
      const focusTimeout = setTimeout(() => {
        lightboxCloseRef.current?.focus();
      }, 50);
      return () => clearTimeout(focusTimeout);
    }
  }, [lightboxImg]);

  // Tab key focus trap inside lightbox
  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;
    if (!lightboxRef.current) return;
    const focusableElements = lightboxRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements.length) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  // Entrance animations for scroll triggers
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.about-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-header',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Bio Card
      gsap.fromTo('.about-bio',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-bio',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Strengths stagger
      gsap.fromTo('.about-chip',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-strengths',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Education panel
      gsap.fromTo('.about-right-panel',
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-right-panel',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full max-w-5xl mx-auto py-12 sm:py-16 px-4 sm:px-6 relative">
      {/* Header */}
      <div className="about-header mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">About</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
          A little about <span className="gradient-text">me</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-lg">My background, education, and what drives me as a developer.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
        {/* Left Column: Bio & Strengths */}
        <div className="lg:col-span-5 space-y-5">
          {/* Bio */}
          <div className="about-bio p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Who I Am</p>
            <p className="text-gray-600 dark:text-gray-300 text-[14px] leading-[1.75]">{whoIAmText}</p>
          </div>

          {/* Strengths */}
          <div className="about-strengths p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Key Strengths</p>
            <div className="flex flex-wrap gap-2">
              {keyStrengths.map((s) => (
                <span key={s.name}
                  className="about-chip chip cursor-default hover:scale-105 hover:-translate-y-0.5 transition-transform duration-200">
                  <span>{s.emoji}</span>{s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Interface */}
        <div className="lg:col-span-7 about-right-panel flex flex-col">
          {/* Tabs Selector */}
          <div
            role="tablist"
            aria-label="About section categories"
            className="flex items-center gap-1 bg-gray-100/70 dark:bg-white/[0.04] p-1 rounded-2xl mb-6 select-none w-fit border border-gray-200/50 dark:border-white/5"
          >
            {[
              { id: 'education', name: 'Education' },
              { id: 'experience', name: 'Experience' },
              { id: 'interests', name: 'Interests' }
            ].map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id ? 'true' : 'false'}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer transition-all duration-300 font-bold px-4 py-2 rounded-xl text-xs border-none bg-transparent
                  ${activeTab === tab.id
                    ? 'text-accent bg-white dark:bg-white/10 shadow-md'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div className="space-y-4 min-h-[300px]">
            {activeTab === 'education' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {educationData.map((edu) => (
                  <div key={edu.title}
                    className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 hover:border-accent-light dark:hover:border-accent-light-dark transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${edu.accent} rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm shadow-md`}>
                        {edu.icon}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">{edu.title}</h4>
                          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium flex-shrink-0">{edu.location}</span>
                        </div>
                        <p className="text-accent font-medium text-xs mt-0.5">{edu.institution}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-relaxed">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {experienceData.map((exp) => (
                  <div key={exp.title}
                    className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 hover:border-accent-light dark:hover:border-accent-light-dark transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${exp.accent} rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm shadow-md`}>
                        {exp.icon}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">{exp.title}</h4>
                          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium flex-shrink-0">{exp.location}</span>
                        </div>
                        <p className="text-accent font-medium text-xs mt-0.5">{exp.institution}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-relaxed">{exp.description}</p>
                        {exp.certLink && (
                          <button
                            onClick={() => setLightboxImg(exp.certLink)}
                            className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover font-semibold text-xs mt-2.5 transition-colors border-none bg-transparent cursor-pointer"
                          >
                            View Certificate <FaExternalLinkAlt className="text-[9px]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'interests' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {interestsData.map((interest, i) => (
                  <div key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 hover:border-accent-light dark:hover:border-accent-light-dark transition-all duration-300 backdrop-blur-sm text-left">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">{interest.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-relaxed">{interest.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Glassmorphic Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <div
            ref={lightboxRef}
            onKeyDown={handleTabKey}
            className="relative max-w-4xl max-h-[85vh] min-w-[280px] min-h-[180px] sm:min-w-[400px] sm:min-h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl p-2 animate-in zoom-in-95 duration-200 flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {imgLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl z-10">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-accent animate-spin" />
              </div>
            )}
            <img
              src={lightboxImg}
              alt="Certificate"
              onLoad={() => setImgLoading(false)}
              className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-inner transition-opacity duration-300 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
            />
            <div className="flex items-center justify-between mt-3 px-2 w-full">
              <a
                href={lightboxImg}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white hover:underline cursor-pointer decoration-white/30"
              >
                Open in new tab <FaExternalLinkAlt size={10} />
              </a>
              <button
                ref={lightboxCloseRef}
                onClick={() => setLightboxImg(null)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border-none cursor-pointer transition-colors shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default About;