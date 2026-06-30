import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaTimes, FaCheckCircle, FaUser } from 'react-icons/fa';
import { gsap } from '../utils/gsap';

const languageColors = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5', Java: '#f89820',
  HTML: '#e34c26', CSS: '#1572b6', Vue: '#41b883', Vuejs: '#41b883', React: '#61dafb',
  Flask: '#6b7280', Express: '#6b7280', Mongodb: '#47a248', Bootstrap: '#7c3aed',
  SQL: '#f97316', Tailwindcss: '#06b6d4',
};

const USE_LOCAL_DATA = true;

const fallbackProjects = [
  { id: 1, title: 'WheelSpot', description: 'A modern, full-stack parking management app built with Flask, Vue.js, and Celery. Real-time booking, admin control, automated reports.', github: 'https://github.com/surajskrv/WheelSpot', demo: 'https://wheelspot.onrender.com/', stars: 4, forks: 1, language: ['Vuejs', 'Flask', 'JavaScript', 'Bootstrap', 'SQL'], topics: ['parking-system'] },
  { id: 2, title: 'CuraNet', description: 'A comprehensive Hospital Management System with role-based access control for Admins, Doctors, and Patients. Vue 3, Flask, SQLite.', github: 'https://github.com/surajskrv/CuraNet', demo: 'https://cura-net.vercel.app/', stars: 3, forks: 0, language: ['Flask', 'Vuejs', 'JavaScript', 'SQL'], topics: ['hospital-management'] },
  { id: 3, title: 'Flixxit', description: 'A web application inspired by OTT platforms like Netflix & Prime Video. Full-stack streaming experience with MERN stack.', github: 'https://github.com/surajskrv/Flixxit', demo: 'https://flixxit-00r6.onrender.com/', stars: 5, forks: 2, language: ['React', 'Express', 'JavaScript', 'Mongodb'], topics: ['streaming'] },
];

const projectDetails = {
  WheelSpot: {
    features: [
      'Real-time Parking Slot Availability Tracking',
      'Advanced Booking and Reservation Engine',
      'Interactive Visual Map Layout of Parking Lots',
      'Celery Worker Integration for automated daily PDF reports',
      'Admin Portal for managing slot status and pricing tiers'
    ],
    role: 'Lead Full-Stack Developer — Designed the database models, wrote Flask REST APIs, and built the Vue 3 user dashboard from scratch.'
  },
  CuraNet: {
    features: [
      'Role-based authentication & route protection (Admin, Doctor, Patient)',
      'Digital Medical Records management & doctor prescriptions writer',
      'Appointment Scheduling system with calendar reminders',
      'Comprehensive administrative dashboards monitoring clinical metrics',
      'Lightweight SQL backend using Flask and SQLite with automated seed data'
    ],
    role: 'Database & Backend architect — Modeled the SQLite schema, implemented JWT secure authentication flow, and built doctors clinical dashboard.'
  },
  Flixxit: {
    features: [
      'Video streaming engine supporting chunked content delivery',
      'Dynamic search, filters, and watch-later list state',
      'Interactive hero slider with dynamic movie banners',
      'Fully responsive UI matching premium streaming platforms',
      'Secure MongoDB storage for user preferences and playback records'
    ],
    role: 'Frontend & UI Developer — Crafted custom media players, optimized page responsiveness, and integrated Express server routes.'
  }
};

const TiltCard = memo(function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rectRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { transformPerspective: 1200 });
  }, []);

  const onEnter = useCallback(() => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const onMove = useCallback((e) => {
    if (!ref.current || !rectRef.current) return;
    const r = rectRef.current;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, {
      rotateX: y * -8,
      rotateY: x * 8,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const onLeave = useCallback(() => {
    rectRef.current = null;
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
});

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900/50 shadow-sm">
      <div className="p-6 space-y-3">
        <div className="h-5 w-2/3 rounded-lg shimmer" />
        <div className="h-3 w-full rounded shimmer" />
        <div className="h-3 w-4/5 rounded shimmer" />
        <div className="flex gap-2 pt-2"><div className="h-6 w-16 rounded-full shimmer" /><div className="h-6 w-16 rounded-full shimmer" /></div>
      </div>
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
        <div className="h-9 flex-1 rounded-xl shimmer" /><div className="h-9 flex-1 rounded-xl shimmer" />
      </div>
    </div>
  );
}

const Projects = memo(function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const modalCloseRef = useRef(null);

  // Close modal on escape keypress
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  // Focus modal close button when opened
  useEffect(() => {
    if (selectedProject) {
      const focusTimeout = setTimeout(() => {
        modalCloseRef.current?.focus();
      }, 50);
      return () => clearTimeout(focusTimeout);
    }
  }, [selectedProject]);

  // Tab key focus trap inside details modal
  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;
    if (!modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll(
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

  useEffect(() => {
    if (USE_LOCAL_DATA) {
      const t = setTimeout(() => { setProjects(fallbackProjects); setLoading(false); }, 400);
      return () => clearTimeout(t);
    }
    (async () => {
      try {
        const res = await fetch('https://api.github.com/users/surajskrv/repos?sort=updated&per_page=15');
        if (!res.ok) throw new Error();
        const repos = await res.json();
        const filtered = repos.filter(r => !r.fork && r.description && r.name !== 'Portfolio')
          .map(r => ({ id: r.id, title: r.name, description: r.description, github: r.html_url, demo: r.homepage || '', stars: r.stargazers_count, forks: r.forks_count, language: r.language ? [r.language] : [], topics: r.topics || [] }));
        setProjects(filtered.length ? filtered : fallbackProjects);
      } catch { setProjects(fallbackProjects); }
      finally { setLoading(false); }
    })();
  }, []);

  // ScrollTrigger animations
  useEffect(() => {
    if (loading || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-header',
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo('.project-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Stagger animation when filter changes
  useEffect(() => {
    if (loading || projects.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeFilter, loading, projects]);

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Flask') return project.language.some(l => l.toLowerCase() === 'flask');
    if (activeFilter === 'React') return project.language.some(l => l.toLowerCase() === 'react');
    if (activeFilter === 'Vue.js') return project.language.some(l => l.toLowerCase().includes('vue'));
    if (activeFilter === 'MERN') return project.language.some(l => ['mongodb', 'express', 'react', 'node'].includes(l.toLowerCase()));

    return true;
  });

  return (
    <section ref={sectionRef} className="w-full max-w-5xl mx-auto py-12 sm:py-16 px-4 sm:px-6 relative" style={{ perspective: '1200px' }}>
      
      {/* Header */}
      <div className="projects-header mb-12 flex flex-col text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">Projects</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
          Featured <span className="gradient-text">work</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">A selection of recent projects showcasing full-stack skills.</p>
        
        {/* Filter Controls */}
        <div
          role="tablist"
          aria-label="Project category filter"
          className="flex items-center gap-1 bg-gray-100/70 dark:bg-white/[0.04] p-1 rounded-2xl select-none border border-gray-200/50 dark:border-white/5 w-fit flex-wrap mt-8"
        >
          {['All', 'Flask', 'React', 'Vue.js', 'MERN'].map(filter => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter ? 'true' : 'false'}
              onClick={() => setActiveFilter(filter)}
              className={`cursor-pointer transition-all duration-300 font-bold px-3 py-1.5 rounded-xl text-xs border-none bg-transparent
                ${activeFilter === filter
                  ? 'text-accent bg-white dark:bg-white/10 shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/10 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-gray-400 text-sm font-semibold">No projects match your criteria.</p>
        </div>
      ) : (
        <div className="projects-grid grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-left">
          {filteredProjects.map((project, index) => {
            const prettyName = project.title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            return (
              <div key={project.id} className="project-card">
                <TiltCard className="h-full rounded-2xl bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-accent-light dark:hover:border-accent-light-dark transition-all duration-300 group backdrop-blur-sm flex flex-col justify-between">
                  <div>
                    {/* Gradient accent top line */}
                    <div className="h-1 w-full bg-gradient-to-r from-accent via-purple-500 to-pink-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    <div className="p-4 sm:p-6 pb-2">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-base font-display font-bold text-gray-800 dark:text-gray-100 group-hover:text-accent transition-colors">
                          {prettyName}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                          <span className="flex items-center gap-1"><FaStar className="text-amber-400" />{project.stars}</span>
                          <span className="flex items-center gap-1"><FaCodeBranch />{project.forks}</span>
                        </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.language.slice(0, 4).map(lang => (
                          <span key={lang} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 dark:bg-gray-950/40 text-gray-600 dark:text-gray-400 text-[11px] rounded-full font-medium border border-gray-100 dark:border-gray-850">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: languageColors[lang] || '#9ca3af' }} />
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 sm:px-6 py-4 flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full text-center text-xs font-bold text-accent hover:underline py-1 bg-transparent border-none cursor-pointer"
                    >
                      Read Specifications
                    </button>
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex gap-2">
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-xs font-semibold shadow-sm">
                        <FaGithub /> Source
                      </a>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors text-xs font-semibold shadow-sm shadow-accent/20">
                          <FaExternalLinkAlt className="text-[10px]" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      )}

      {/* GitHub CTA */}
      {!loading && filteredProjects.length > 0 && (
        <div className="projects-cta text-center mt-10">
          <a href="https://github.com/surajskrv" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm shadow-md hover:-translate-y-0.5 transition-transform duration-200">
            <FaGithub /> View all on GitHub
          </a>
        </div>
      )}

      {/* Glassmorphic Project Details Modal */}
      {selectedProject && (() => {
        const details = projectDetails[selectedProject.title] || {
          features: ['Dynamic state integrations', 'Full-stack client-server data synchronization', 'Interactive user panels'],
          role: 'Full Stack developer — implemented client modules and database connections.'
        };
        const prettyName = selectedProject.title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
          >
            <div
              ref={modalRef}
              onKeyDown={handleTabKey}
              className="relative max-w-xl w-full rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white dark:bg-gray-900 shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200 text-left overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                ref={modalCloseRef}
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/[0.06] dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors border-none cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes size={14} />
              </button>

              <h3 className="text-xl sm:text-2xl font-display font-black text-gray-900 dark:text-white mb-2">
                {prettyName}
              </h3>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedProject.language.map(lang => (
                  <span key={lang} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 dark:bg-gray-950/40 text-gray-600 dark:text-gray-400 text-[10px] rounded-full font-bold border border-gray-150 dark:border-gray-800">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: languageColors[lang] || '#9ca3af' }} />
                    {lang}
                  </span>
                ))}
              </div>

              {/* Role */}
              <div className="mb-6 p-4 rounded-xl bg-accent-light dark:bg-accent-light-dark border border-accent/10 flex gap-3">
                <FaUser className="text-accent flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-gray-800 dark:text-gray-200 block mb-0.5">My Role &amp; Focus</span>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{details.role}</p>
                </div>
              </div>

              {/* Core Features */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-3">Core Features &amp; Implementation</span>
                <ul className="space-y-2.5">
                  {details.features.map((feature, i) => (
                    <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-8 border-t border-gray-100 dark:border-gray-800 pt-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-all text-xs sm:text-sm font-semibold shadow-sm"
                >
                  <FaGithub /> Source Code
                </a>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all text-xs sm:text-sm font-semibold shadow-sm shadow-accent/20"
                  >
                    <FaExternalLinkAlt size={10} /> Live Deployment
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
});

export default Projects;