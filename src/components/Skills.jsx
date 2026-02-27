import { FaPython, FaJs, FaHtml5, FaCss3Alt, FaDatabase, FaJava } from 'react-icons/fa';
import { SiNodedotjs, SiExpress, SiMongodb, SiFlask, SiPostman, SiTailwindcss } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { FaGithubSquare, FaVuejs, FaReact } from 'react-icons/fa';
import { TbApi } from "react-icons/tb";
import { DiBootstrap } from "react-icons/di";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const technicalSkills = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: <FaJs className="text-yellow-400" />, glow: 'hover:shadow-yellow-400/20' },
      { name: 'Python', icon: <FaPython className="text-blue-400" />, glow: 'hover:shadow-blue-400/20' },
      { name: 'Java', icon: <FaJava className="text-orange-500" />, glow: 'hover:shadow-orange-500/20' },
    ],
  },
  {
    category: 'Web Development',
    skills: [
      { name: 'Vuejs', icon: <FaVuejs className="text-green-400" />, glow: 'hover:shadow-green-400/20' },
      { name: 'React', icon: <FaReact className="text-blue-500" />, glow: 'hover:shadow-blue-500/20' },
      { name: 'HTML', icon: <FaHtml5 className="text-orange-500" />, glow: 'hover:shadow-orange-500/20' },
      { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" />, glow: 'hover:shadow-blue-500/20' },
      { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" />, glow: 'hover:shadow-green-600/20' },
      { name: 'Express', icon: <SiExpress className="text-gray-800 dark:text-gray-300" />, glow: 'hover:shadow-gray-400/20' },
      { name: 'RESTful APIs', icon: <TbApi className="text-blue-400" />, glow: 'hover:shadow-blue-400/20' },
      { name: 'Flask', icon: <SiFlask className="text-gray-800 dark:text-gray-300" />, glow: 'hover:shadow-gray-400/20' },
      { name: 'BootStrap', icon: <DiBootstrap className="text-purple-700" />, glow: 'hover:shadow-purple-700/20' },
      { name: 'Tailwind', icon: <SiTailwindcss className="text-blue-600" />, glow: 'hover:shadow-blue-600/20' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" />, glow: 'hover:shadow-green-500/20' },
      { name: 'SQL', icon: <FaDatabase className="text-blue-300" />, glow: 'hover:shadow-blue-300/20' },
    ],
  },
  {
    category: 'Other Technologies',
    skills: [
      { name: 'Git/GitHub', icon: <FaGithubSquare className="text-gray-700 dark:text-gray-300" />, glow: 'hover:shadow-gray-400/20' },
      { name: 'VsCode', icon: <VscVscode className="text-blue-400" />, glow: 'hover:shadow-blue-400/20' },
      { name: 'Postman', icon: <SiPostman className="text-orange-500" />, glow: 'hover:shadow-orange-500/20' },
    ],
  },
];

const softSkills = [
  { name: 'Communication', emoji: '💬' },
  { name: 'Time Management', emoji: '⏰' },
  { name: 'Team Collaboration', emoji: '🤝' },
  { name: 'Adaptability', emoji: '🌊' },
  { name: 'Emotional Intelligence', emoji: '💡' },
  { name: 'Decision Making', emoji: '⚖️' },
  { name: 'Work Ethic', emoji: '💪' },
  { name: 'Empathy', emoji: '❤️' },
];

const whatIBring = [
  'Strong foundation in modern web development technologies.',
  'Experience with full-stack development and API integration.',
  'Quick learner with ability to adapt to new technologies.',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-display font-bold gradient-text mb-4">Skills & Expertise</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-col md:flex-row gap-10"
      >
        {/* Technical Skills */}
        <div className="flex-1">
          <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-6">Technical Skills</h3>
          <div className="space-y-5">
            {technicalSkills.map((cat) => (
              <motion.div
                key={cat.category}
                variants={chipVariants}
                className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200/60 dark:border-white/5 hover:border-indigo-200 dark:hover:border-indigo-500/20 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider">{cat.category}</h4>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      variants={chipVariants}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-medium text-sm border border-gray-200/60 dark:border-white/5 hover:border-indigo-300/50 dark:hover:border-indigo-500/30 cursor-default transition-all duration-300 hover:shadow-lg ${skill.glow}`}
                    >
                      <span className="text-lg">{skill.icon}</span>
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft Skills and What I Bring */}
        <div className="flex-1 space-y-8">
          {/* Soft Skills */}
          <div>
            <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-6">Soft Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {softSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  variants={chipVariants}
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200/60 dark:border-white/5 hover:border-indigo-300/50 dark:hover:border-indigo-500/30 text-gray-600 dark:text-gray-300 font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <span className="text-lg">{skill.emoji}</span>
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>

          {/* What I Bring */}
          <div>
            <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-6">What I Bring</h3>
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200/60 dark:border-white/5 shadow-sm">
              <ul className="space-y-3">
                {whatIBring.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={chipVariants}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                  >
                    <span className="mt-1.5 flex-shrink-0">
                      <span className="block h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Skills;