import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const whoIAmText = `
I am a passionate and results-driven Full Stack Developer with hands-on experience building modern, scalable web applications. My core expertise lies in the MERN stack, along with proficiency in Flask and Vue.js for backend and frontend development. Beyond coding, I value clear communication, problem-solving, and staying curious. Whether I am working solo or in a team, I always aim to deliver thoughtful, user-focused solutions that make a measurable impact.
`;

const keyStrengths = [
  { name: 'Problem Solving', emoji: '🧩' },
  { name: 'Critical Thinking', emoji: '🧠' },
  { name: 'Quick Learning', emoji: '⚡' },
  { name: 'Attention to Detail', emoji: '🔍' },
  { name: 'Technical Adaptability', emoji: '🔄' },
  { name: 'Self-Motivation', emoji: '🚀' },
  { name: 'Goal-Oriented Approach', emoji: '🎯' },
];

const certificationLink = "https://certificates.knowledgehut.com/7bdc037b-caf9-41f3-ad32-d2fbe371c9c4-UG%20Non%20GGU%20Course%20completion-KH12-8009000-20250105005.jpeg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-display font-bold gradient-text mb-4">About Me</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Left Column */}
        <div className="space-y-8">
          {/* Who I Am */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">Who I Am</h3>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              {whoIAmText}
            </p>
          </motion.div>

          {/* Key Strengths */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">Key Strengths</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {keyStrengths.map((strength, i) => (
                <motion.div
                  key={strength.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all duration-300 cursor-default"
                >
                  <span className="text-lg">{strength.emoji}</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{strength.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Education */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">Education</h3>
            <div className="space-y-4 relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-20 rounded-full hidden lg:block" />

              {/* Diploma */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="group relative bg-white dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200/60 dark:border-white/5 hover:border-indigo-300/50 dark:hover:border-indigo-500/20 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-400/15 group-hover:shadow-indigo-400/25 transition-shadow">
                    <FaGraduationCap className="text-white text-lg" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-0.5">Diploma in Programming</h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-0.5">IIT Madras</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">Chennai, India</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      Comprehensive programming foundation with focus on modern development practices
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* MCA */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="group relative bg-white dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200/60 dark:border-white/5 hover:border-indigo-300/50 dark:hover:border-indigo-500/20 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-400/15 group-hover:shadow-indigo-400/25 transition-shadow">
                    <FaGraduationCap className="text-white text-lg" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-0.5">MCA</h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-0.5">IGNOU</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">Patna, India</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      Advanced studies in computer applications with emphasis on software development and systems analysis.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Certificate */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="group relative bg-white dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200/60 dark:border-white/5 hover:border-purple-300/50 dark:hover:border-purple-500/20 shadow-sm hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-400/15 group-hover:shadow-purple-400/25 transition-shadow">
                    <FaCertificate className="text-white text-lg" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-0.5">Full-Stack (MERN) Development</h4>
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-0.5">KnowledgeHut UpGrad</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">Bootcamp</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">
                      Intensive training in MongoDB, Express.js, React, and Node.js for full-stack development
                    </p>
                    <motion.a
                      href={certificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-medium text-sm transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      View Certificate
                      <FaExternalLinkAlt className="text-xs" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;