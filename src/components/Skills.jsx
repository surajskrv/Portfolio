import { FaPython, FaJs, FaHtml5, FaCss3Alt, FaDatabase, FaJava } from 'react-icons/fa';
import { SiNodedotjs, SiExpress, SiMongodb, SiFlask, SiPostman, SiTailwindcss } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { FaGithubSquare, FaVuejs, FaReact } from 'react-icons/fa';
import { TbApi } from "react-icons/tb";
import { DiBootstrap } from "react-icons/di";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { memo } from 'react';

const allSkills = [
  { name: 'JavaScript', icon: <FaJs />, color: 'text-yellow-500' },
  { name: 'React', icon: <FaReact />, color: 'text-cyan-500' },
  { name: 'Vue.js', icon: <FaVuejs />, color: 'text-emerald-500' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: 'text-green-600' },
  { name: 'Python', icon: <FaPython />, color: 'text-blue-500' },
  { name: 'Flask', icon: <SiFlask />, color: 'text-gray-600 dark:text-gray-300' },
  { name: 'Express', icon: <SiExpress />, color: 'text-gray-600 dark:text-gray-300' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-600' },
  { name: 'SQL', icon: <FaDatabase />, color: 'text-blue-500' },
  { name: 'HTML', icon: <FaHtml5 />, color: 'text-orange-500' },
  { name: 'CSS', icon: <FaCss3Alt />, color: 'text-blue-600' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-cyan-500' },
  { name: 'Bootstrap', icon: <DiBootstrap />, color: 'text-purple-600' },
  { name: 'Java', icon: <FaJava />, color: 'text-orange-600' },
  { name: 'REST APIs', icon: <TbApi />, color: 'text-blue-500' },
  { name: 'Git', icon: <FaGithubSquare />, color: 'text-gray-700 dark:text-gray-300' },
  { name: 'VS Code', icon: <VscVscode />, color: 'text-blue-600' },
  { name: 'Postman', icon: <SiPostman />, color: 'text-orange-500' },
];

const softSkills = ['Communication', 'Time Management', 'Team Work', 'Adaptability', 'Emotional Intelligence', 'Decision Making', 'Work Ethic', 'Empathy'];

function MarqueeRow({ skills, reverse = false }) {
  const doubled = [...skills, ...skills];
  return (
    <div className="overflow-hidden relative group">
      <div className={`flex gap-3 will-change-transform ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}>
        {doubled.map((skill, i) => (
          <div key={`${skill.name}-${i}`}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all duration-300 cursor-default">
            <span className={`text-base sm:text-xl ${skill.color}`}>{skill.icon}</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{skill.name}</span>
          </div>
        ))}
      </div>
      {/* Fade edges — match section background */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
    </div>
  );
}

const Skills = memo(function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="w-full max-w-5xl mx-auto py-14 sm:py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400 mb-2">Skills</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
          Tech I work <span className="gradient-text">with</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">Languages, frameworks, and tools in my daily toolkit.</p>
      </motion.div>

      <div ref={ref}>
        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-3 mb-12"
        >
          <MarqueeRow skills={allSkills.slice(0, 9)} />
          <MarqueeRow skills={allSkills.slice(9)} reverse />
        </motion.div>

        {/* Soft Skills + What I Bring */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-4">Soft Skills</p>
            <div className="flex flex-wrap gap-2">
              {softSkills.map(skill => (
                <span key={skill}
                  className="chip cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-4">What I Bring</p>
            <ul className="space-y-3">
              {[
                'Strong foundation in modern web development technologies.',
                'Full-stack development and API integration experience.',
                'Quick learner who adapts rapidly to new technologies.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Skills;