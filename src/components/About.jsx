import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { memo } from 'react';

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

const education = [
  { title: 'Diploma in Programming', institution: 'IIT Madras', location: 'Chennai', description: 'Programming foundation with modern development practices', icon: <FaGraduationCap />, accent: 'bg-indigo-500' },
  { title: 'MCA', institution: 'IGNOU', location: 'Patna', description: 'Advanced studies in computer applications and software development', icon: <FaGraduationCap />, accent: 'bg-purple-500' },
  { title: 'Full-Stack MERN', institution: 'KnowledgeHut UpGrad', location: 'Bootcamp', description: 'Intensive training in MongoDB, Express, React, Node.js', icon: <FaCertificate />, accent: 'bg-amber-500', certLink: certificationLink },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const About = memo(function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="w-full max-w-5xl mx-auto py-14 sm:py-20 px-4 sm:px-6">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400 mb-2">About</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
          A little about <span className="gradient-text">me</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-lg">My background, education, and what drives me as a developer.</p>
      </motion.div>

      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Bio */}
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ delay: 0.1, duration: 0.4 }}
            className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Who I Am</p>
            <p className="text-gray-600 dark:text-gray-300 text-[14px] leading-[1.75]">{whoIAmText}</p>
          </motion.div>

          {/* Strengths */}
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ delay: 0.2, duration: 0.4 }}
            className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-4">Key Strengths</p>
            <div className="flex flex-wrap gap-2">
              {keyStrengths.map((s, i) => (
                <motion.span key={s.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="chip cursor-default">
                  <span>{s.emoji}</span>{s.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Education */}
        <div className="lg:col-span-7 space-y-4">
          <motion.p initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ delay: 0.05 }}
            className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1 px-1">
            Education & Certifications
          </motion.p>
          {education.map((edu, i) => (
            <motion.div key={edu.title}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
              className="group p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 ${edu.accent} rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm shadow-md`}>
                  {edu.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">{edu.title}</h4>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium flex-shrink-0">{edu.location}</span>
                  </div>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium text-xs mt-0.5">{edu.institution}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-relaxed">{edu.description}</p>
                  {edu.certLink && (
                    <a href={edu.certLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-semibold text-xs mt-2.5 transition-colors">
                      View Certificate <FaExternalLinkAlt className="text-[9px]" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default About;