import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

const languageColors = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5', Java: '#f89820',
  HTML: '#e34c26', CSS: '#1572b6', Vue: '#41b883', Vuejs: '#41b883', React: '#61dafb',
  Flask: '#6b7280', Express: '#6b7280', Mongodb: '#47a248', Bootstrap: '#7c3aed',
  SQL: '#f97316', Tailwindcss: '#06b6d4',
};

const USE_LOCAL_DATA = true;

const fallbackProjects = [
  { id: 1, title: 'WheelSpot', description: 'A modern, full-stack parking management app built with Flask, Vue.js, and Celery. Real-time booking, admin control, automated reports.', github: 'https://github.com/surajskrv/WheelSpot', demo: 'https://wheelspot.onrender.com/', stars: 0, forks: 0, language: ['Vuejs', 'Flask', 'JavaScript', 'Bootstrap', 'SQL'], topics: ['parking-system'] },
  { id: 2, title: 'Curanet', description: 'A comprehensive Hospital Management System with role-based access control for Admins, Doctors, and Patients. Vue 3, Flask, SQLite.', github: 'https://github.com/surajskrv/CuraNet', demo: 'https://cura-net.vercel.app/', stars: 0, forks: 0, language: ['Flask', 'Vuejs', 'JavaScript', 'SQL'], topics: ['hospital-management'] },
  { id: 3, title: 'Flixxit', description: 'A web application inspired by OTT platforms like Netflix & Prime Video. Full-stack streaming experience with MERN stack.', github: 'https://github.com/surajskrv/Flixxit', demo: 'https://flixxit-00r6.onrender.com/', stars: 0, forks: 0, language: ['React', 'Express', 'JavaScript', 'Mongodb'], topics: ['streaming'] },
];

const TiltCard = memo(function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 25 });

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }, [rawX, rawY]);

  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className={className}>
      {children}
    </motion.div>
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

  useEffect(() => {
    if (USE_LOCAL_DATA) {
      const t = setTimeout(() => { setProjects(fallbackProjects); setLoading(false); }, 400);
      return () => clearTimeout(t);
    }
    (async () => {
      try {
        const res = await fetch('https://api.github.com/users/surajskrv/repos?sort=updated&per_page=10');
        if (!res.ok) throw new Error();
        const repos = await res.json();
        const filtered = repos.filter(r => !r.fork && r.description && r.name !== 'Portfolio')
          .map(r => ({ id: r.id, title: r.name, description: r.description, github: r.html_url, demo: r.homepage || '', stars: r.stargazers_count, forks: r.forks_count, language: r.language ? [r.language] : [], topics: r.topics || [] }))
          .slice(0, 3);
        setProjects(filtered.length ? filtered : fallbackProjects);
      } catch { setProjects(fallbackProjects); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto py-20 px-4 sm:px-6" style={{ perspective: '1200px' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400 mb-2">Projects</p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white">
          Featured <span className="gradient-text">work</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">A selection of recent projects showcasing full-stack skills.</p>
      </motion.div>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}>
              <TiltCard className="h-full rounded-2xl bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all duration-300 group backdrop-blur-sm">
                {/* Gradient accent */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-display font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <div className="flex items-center gap-2.5 text-xs text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1"><FaStar className="text-amber-400" />{project.stars}</span>
                      <span className="flex items-center gap-1"><FaCodeBranch />{project.forks}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.language.slice(0, 4).map(lang => (
                      <span key={lang} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[11px] rounded-full font-medium border border-gray-100 dark:border-gray-700">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: languageColors[lang] || '#9ca3af' }} />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-900 dark:bg-gray-800 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-xs font-semibold shadow-sm">
                    <FaGithub /> Source
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors text-xs font-semibold shadow-sm shadow-indigo-500/20">
                      <FaExternalLinkAlt className="text-[10px]" /> Live
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center mt-12">
          <a href="https://github.com/surajskrv" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm shadow-md">
            <FaGithub /> View all on GitHub
          </a>
        </motion.div>
      )}
    </section>
  );
});

export default Projects;