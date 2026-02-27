import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { memo, useCallback, useRef } from 'react';

const CONTACTS = [
  { icon: <FaLinkedin />, label: 'LinkedIn', value: 'surajskrv', href: 'https://linkedin.com/in/surajskr', accent: 'bg-blue-500' },
  { icon: <FaGithub />, label: 'GitHub', value: 'surajskrv', href: 'https://github.com/surajskrv', accent: 'bg-gray-800 dark:bg-gray-600' },
  { icon: <FaEnvelope />, label: 'Email', value: 'surajskrv@gmail.com', href: 'mailto:surajskrv@gmail.com?subject=Portfolio Contact', accent: 'bg-rose-500' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Patna, India', href: null, accent: 'bg-emerald-500' },
];

const Contact = memo(function Contact() {
  const ctaRef = useRef(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sx = useSpring(mX, { stiffness: 50, damping: 20 });
  const sy = useSpring(mY, { stiffness: 50, damping: 20 });

  const onMouseMove = useCallback((e) => {
    if (!ctaRef.current) return;
    const r = ctaRef.current.getBoundingClientRect();
    mX.set(e.clientX - r.left);
    mY.set(e.clientY - r.top);
  }, [mX, mY]);

  const spotlightBg = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(500px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.08), transparent 60%)`
  );

  return (
    <section className="w-full max-w-5xl mx-auto py-14 sm:py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400 mb-2">Contact</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
          Let's work <span className="gradient-text">together</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">Reach out through any of these channels — I'd love to connect.</p>
      </motion.div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {CONTACTS.map((c, i) => (
          <motion.a key={c.label}
            href={c.href || undefined}
            target={c.href && (c.href.startsWith('http') || c.href.startsWith('mailto')) ? '_blank' : undefined}
            rel={c.href && c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all duration-300"
          >
            <div className={`w-10 h-10 ${c.accent} rounded-xl flex items-center justify-center text-white text-sm mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
              {c.icon}
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{c.label}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{c.value}</p>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <motion.div ref={ctaRef} onMouseMove={onMouseMove}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 sm:p-8 md:p-10 shadow-xl shadow-indigo-500/20"
      >
        {/* Spotlight */}
        <motion.div className="absolute inset-0 pointer-events-none hidden sm:block" style={{ background: spotlightBg }} />

        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-white/10 rounded-full blur-xl" />

        <div className="relative z-10 text-center max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs text-white/80 font-semibold uppercase tracking-widest">Available</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2 sm:mb-3">Have a project in mind?</h3>
          <p className="text-white/70 text-xs sm:text-sm mb-5 sm:mb-7 leading-relaxed">I'd love to hear about your ideas. Let's build something great together.</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3">
            <motion.a href="mailto:surajskrv@gmail.com?subject=Project Inquiry" target="_blank"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors text-sm shadow-lg"
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <FaEnvelope className="text-xs" /> Email Me
              <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
            <motion.a href="https://linkedin.com/in/surajskr" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold rounded-xl transition-all text-sm backdrop-blur-sm"
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <FaLinkedin className="text-xs" /> LinkedIn
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

export default Contact;