import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect, useCallback, useRef } from 'react';

const handleResumeDownload = () => {
  try {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Suraj_Kumar_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 100);
  } catch { window.open('/Resume.pdf', '_blank'); }
};

const roles = ["Full Stack Developer","Python Developer", "MERN Developer", "AI Enthusiast", "Flask Developer"];

function TypingEffect() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;
    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex(p => (p + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, isDeleting ? text.length - 1 : text.length + 1));
      }, isDeleting ? 25 : 60);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="text-indigo-600 dark:text-indigo-400">
      {text}
      <span className="inline-block w-[2px] h-[1.1em] bg-indigo-500 dark:bg-indigo-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

function AnimatedCounter({ value, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        setDone(true);
        let n = 0;
        const step = Math.max(1, Math.floor(value / 20));
        const t = setInterval(() => { n += step; if (n >= value) { setCount(value); clearInterval(t); } else setCount(n); }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, done]);

  return (
    <div ref={ref} className="text-center min-w-0">
      <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-gray-900 dark:text-white">
        {count}<span className="text-indigo-500 dark:text-indigo-400">+</span>
      </div>
      <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{label}</div>
    </div>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sx = useSpring(mX, { stiffness: 40, damping: 20 });
  const sy = useSpring(mY, { stiffness: 40, damping: 20 });

  const onMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mX.set(e.clientX - r.left);
    mY.set(e.clientY - r.top);
  }, [mX, mY]);

  const spotlightBg = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.06), transparent 60%)`
  );

  return (
    <section ref={sectionRef} onMouseMove={onMouseMove}
      className="relative flex flex-col items-center justify-center min-h-screen w-full text-center select-none overflow-hidden">

      {/* BG gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-950" />

      {/* Mouse spotlight (desktop only) */}
      <motion.div className="absolute inset-0 pointer-events-none z-[1] hidden md:block" style={{ background: spotlightBg }} />

      {/* Decorative blobs — responsive sizes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 sm:w-80 md:w-[500px] h-64 sm:h-80 md:h-[500px] opacity-30 dark:opacity-[0.08] gpu animate-blob"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', top: '-15%', right: '-10%', filter: 'blur(80px)' }} />
        <div className="absolute w-52 sm:w-72 md:w-[400px] h-52 sm:h-72 md:h-[400px] opacity-20 dark:opacity-[0.06] gpu animate-blob"
          style={{ background: 'radial-gradient(circle, #e879f9, transparent 70%)', bottom: '5%', left: '-8%', filter: 'blur(80px)', animationDelay: '-3s' }} />
        <div className="absolute w-40 sm:w-56 md:w-[300px] h-40 sm:h-56 md:h-[300px] opacity-15 dark:opacity-[0.04] gpu animate-blob hidden sm:block"
          style={{ background: 'radial-gradient(circle, #fb923c, transparent 70%)', top: '40%', left: '55%', filter: 'blur(100px)', animationDelay: '-5s' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #6366f1 0.8px, transparent 0.8px)', backgroundSize: '28px 28px' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-20">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 font-medium border border-gray-200 dark:border-white/10 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black mb-3 sm:mb-4 tracking-tight leading-[0.95]">
          <span className="text-gray-900 dark:text-white">Suraj </span>
          <span className="gradient-text">Kumar</span>
        </motion.h1>

        {/* Role */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="mb-3 sm:mb-4">
          <p className="text-sm sm:text-base md:text-lg font-display font-medium text-gray-600 dark:text-gray-400">
            I'm a <TypingEffect />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
          className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-[15px] leading-relaxed px-2">
          Building scalable web apps with React, Flask & Node.js.
          Turning complex problems into clean, fast experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center mb-8 sm:mb-10 px-4 sm:px-0">
          <button onClick={handleResumeDownload}
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30">
            <FaDownload className="text-xs group-hover:-translate-y-0.5 transition-transform" /> Resume
          </button>
          <a href="#projects"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm">
            View Work <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }}
          className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 px-4 sm:px-8 py-3.5 sm:py-4 bg-white/70 dark:bg-white/[0.03] rounded-2xl border border-gray-200/50 dark:border-white/5 backdrop-blur-sm shadow-sm mb-6 sm:mb-8 mx-auto w-fit">
          <AnimatedCounter value={10} label="Projects" />
          <div className="w-px h-6 sm:h-8 bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
          <AnimatedCounter value={10} label="Technologies" />
          <div className="w-px h-6 sm:h-8 bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
          <AnimatedCounter value={1} label="Certifications" />
        </motion.div>

        {/* Socials */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex gap-2.5 sm:gap-3 justify-center">
          {[
            { Icon: FaGithub, href: 'https://github.com/surajskrv', label: 'GitHub' },
            { Icon: FaLinkedin, href: 'https://linkedin.com/in/surajskr', label: 'LinkedIn' },
          ].map(({ Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200 border border-gray-200 dark:border-gray-700 shadow-sm"
              aria-label={label}>
              <Icon className="text-base sm:text-lg" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2 }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-gray-400 dark:from-gray-600 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;