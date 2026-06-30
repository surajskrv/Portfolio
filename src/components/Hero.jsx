import { FaGithub, FaLinkedin, FaDownload, FaArrowRight, FaLaptopCode, FaCogs, FaAward } from 'react-icons/fa';
import { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from '../utils/gsap';
import Terminal from './Terminal';

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

const roles = ["Full Stack Developer", "Python Developer", "MERN Developer", "AI Enthusiast", "Flask Developer"];

const themeColors = {
  'theme-indigo': '#4f46e5',
  'theme-emerald': '#059669',
  'theme-violet': '#7c3aed',
  'theme-rose': '#e11d48',
  'theme-amber': '#d97706',
};

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
    <span className="text-accent">
      {text}
      <span className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

function AnimatedCounter({ value, label, icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        setDone(true);
        let n = 0;
        const step = Math.max(1, Math.floor(value / 25));
        const t = setInterval(() => {
          n += step;
          if (n >= value) {
            setCount(value);
            clearInterval(t);
          } else {
            setCount(n);
          }
        }, 30);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, done]);

  return (
    <div
      ref={ref}
      className="relative group p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/5 backdrop-blur-md hover:border-accent/30 dark:hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full text-left"
    >
      <div className="flex justify-between items-start mb-1 sm:mb-4">
        <span className="text-sm sm:text-xl text-accent bg-accent-light dark:bg-accent-light-dark p-1.5 sm:p-2 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300 animate-in fade-in duration-300">
          {icon}
        </span>
      </div>
      <div className="min-w-0 mt-1 sm:mt-2">
        <div className="text-lg sm:text-3xl font-display font-black text-gray-900 dark:text-white leading-none">
          {count}<span className="text-accent">+</span>
        </div>
        <div className="text-[8px] xs:text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mt-1 sm:mt-1.5 truncate">
          {label}
        </div>
      </div>
    </div>
  );
}

function Hero({ accentTheme, cursorEnabled, setCursorEnabled }) {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const canvasRef = useRef(null);
  const xToRef = useRef(null);
  const yToRef = useRef(null);
  const activeColorRef = useRef('#e11d48');

  // Track active accent theme hex color changes inside a ref
  useEffect(() => {
    activeColorRef.current = themeColors[accentTheme] || '#e11d48';
  }, [accentTheme]);

  // Canvas particle backdrop logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = Math.min(50, Math.floor((width * height) / 25000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 1,
      });
    }

    let mouseX = null;
    let mouseY = null;

    // Cache canvas rect — read once on mount and refresh on resize
    let cachedRect = canvas.getBoundingClientRect();

    const handleMouseMove = (e) => {
      mouseX = e.clientX - cachedRect.left;
      mouseY = e.clientY - cachedRect.top;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let isVisible = true;
    let frameCount = 0;
    const LINE_DIST_SQ = 110 * 110; // 12100 — pre-computed squared threshold

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      // Fetch dynamic active color from ref (no layout reflow forced!)
      const accent = activeColorRef.current;
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = 0.2;
        ctx.fill();

        // Mouse repulsion
        if (mouseX !== null && mouseY !== null) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) { // 100²
            const dist = Math.sqrt(distSq);
            const force = (100 - dist) / 100;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }
      });

      // Draw linkage lines — every other frame (30fps) since decorative
      if (frameCount % 2 === 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < LINE_DIST_SQ) {
              const dist = Math.sqrt(distSq);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.globalAlpha = ((110 - dist) / 110) * 0.1;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
      resizeTimeout = requestAnimationFrame(() => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        cachedRect = canvas.getBoundingClientRect();
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Setup intersection observer to pause updates offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationId);
          draw();
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP entrance timeline
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-name', { opacity: 0, y: 35, duration: 0.7 })
        .from('.hero-role', { opacity: 0, y: 20, duration: 0.5 }, '-=0.35')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5 }, '-=0.25')
        .from('.hero-stats', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.hero-socials', { opacity: 0, duration: 0.4 }, '-=0.15')
        .from('.hero-terminal', { opacity: 0, x: 40, duration: 0.8 }, '-=0.6')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.1');

      // Scroll indicator bounce
      gsap.to('.hero-scroll-line', {
        y: 6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse spotlight (desktop only)
  const sectionRectRef = useRef(null);
  useEffect(() => {
    if (!spotlightRef.current) return;
    xToRef.current = gsap.quickTo(spotlightRef.current, '--spot-x', { duration: 0.5, ease: 'power3.out' });
    yToRef.current = gsap.quickTo(spotlightRef.current, '--spot-y', { duration: 0.5, ease: 'power3.out' });

    // Cache section rect and refresh on resize
    if (sectionRef.current) sectionRectRef.current = sectionRef.current.getBoundingClientRect();
    const onResize = () => {
      if (sectionRef.current) sectionRectRef.current = sectionRef.current.getBoundingClientRect();
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onMouseMove = useCallback((e) => {
    const r = sectionRectRef.current;
    if (!r) return;
    xToRef.current?.(e.clientX - r.left);
    yToRef.current?.(e.clientY - r.top);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex flex-col items-center justify-center min-h-screen w-full text-center lg:text-left select-none overflow-hidden py-16 sm:py-24"
    >
      {/* BG gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-950" />

      {/* Dynamic Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />

      {/* Mouse spotlight (desktop only) */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-[1] hidden md:block"
        style={{
          '--spot-x': '50%',
          '--spot-y': '50%',
          background: 'radial-gradient(600px circle at var(--spot-x) var(--spot-y), rgba(var(--accent-color), 0.04), transparent 60%)',
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 sm:w-80 md:w-[500px] h-64 sm:h-80 md:h-[500px] opacity-30 dark:opacity-[0.08] gpu animate-blob"
          style={{ background: 'radial-gradient(circle, var(--accent-color), transparent 70%)', top: '-15%', right: '-10%', filter: 'blur(80px)' }} />
        <div className="absolute w-52 sm:w-72 md:w-[400px] h-52 sm:h-72 md:h-[400px] opacity-20 dark:opacity-[0.06] gpu animate-blob"
          style={{ background: 'radial-gradient(circle, #e879f9, transparent 70%)', bottom: '5%', left: '-8%', filter: 'blur(80px)', animationDelay: '-3s' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(circle, var(--accent-color) 0.8px, transparent 0.8px)', backgroundSize: '28px 28px' }} />

      {/* Two-Column Responsive Grid Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-12 sm:pt-16 lg:pt-0">
        
        {/* Left Column: Bio Details */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Name */}
          <h1 className="hero-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black mb-3 sm:mb-4 tracking-tight leading-[0.95] text-center lg:text-left">
            <span className="text-gray-900 dark:text-white">Suraj </span>
            <span className="gradient-text">Kumar</span>
          </h1>

          {/* Role */}
          <div className="hero-role mb-3 sm:mb-4 text-center lg:text-left">
            <p className="text-sm sm:text-base md:text-lg font-display font-medium text-gray-600 dark:text-gray-400">
              I'm a <TypingEffect />
            </p>
          </div>

          {/* Description */}
          <p className="hero-desc text-gray-500 dark:text-gray-400 max-w-lg mb-6 sm:mb-8 text-xs sm:text-sm md:text-[15px] leading-relaxed text-center lg:text-left mx-auto lg:mx-0 px-2 lg:px-0">
            Building scalable web apps with React, Flask &amp; Node.js.
            Turning complex problems into clean, fast experiences.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center lg:justify-start mb-8 sm:mb-10 px-4 sm:px-0">
            <button onClick={handleResumeDownload}
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/35 hover:-translate-y-0.5 cursor-pointer border-none">
              <FaDownload className="text-xs group-hover:-translate-y-0.5 transition-transform" /> Resume
            </button>
            <a href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) {
                  const navbarHeight = 80;
                  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: elementPosition - navbarHeight,
                    behavior: 'smooth'
                  });
                }
              }}
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-white/60 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/5 text-gray-700 dark:text-gray-200 hover:text-accent hover:border-accent/30 dark:hover:border-accent/20 backdrop-blur-md rounded-xl text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              View Work <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="hero-stats grid grid-cols-3 gap-2 sm:gap-4 mb-8 w-full max-w-md lg:max-w-none">
            <AnimatedCounter value={10} label="Projects" icon={<FaLaptopCode />} />
            <AnimatedCounter value={10} label="Technologies" icon={<FaCogs />} />
            <AnimatedCounter value={1} label="Certifications" icon={<FaAward />} />
          </div>

          {/* Socials */}
          <div className="hero-socials flex gap-3 justify-center lg:justify-start">
            {[
              { Icon: FaGithub, href: 'https://github.com/surajskrv', label: 'GitHub' },
              { Icon: FaLinkedin, href: 'https://linkedin.com/in/surajskr', label: 'LinkedIn' },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/60 dark:bg-white/[0.03] text-gray-500 dark:text-gray-400 hover:text-accent hover:border-accent/30 dark:hover:border-accent/20 backdrop-blur-md transition-all duration-300 border border-gray-200/50 dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-1 block cursor-pointer"
                aria-label={label}>
                <Icon className="text-base sm:text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Terminal Console */}
        <div className="hero-terminal lg:col-span-5 w-full max-w-md lg:max-w-none mx-auto lg:mx-0 relative group">
          {/* Background accent glow behind terminal */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-accent to-purple-500 rounded-2xl opacity-10 dark:opacity-20 blur-xl group-hover:opacity-15 dark:group-hover:opacity-30 transition duration-500" />
          <div className="relative">
            <Terminal cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled} />
          </div>
        </div>

      </div>

      {/* Scroll line */}
      <div className="hero-scroll absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 opacity-50">
        <div className="hero-scroll-line">
          <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-gray-400 dark:from-gray-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default Hero;