import { motion } from 'framer-motion';

function Resume() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="section-padding"
    >
      <div className="card flex flex-col items-center">
        <h2 className="text-3xl font-bold gradient-text mb-6 text-center">Education</h2>
        <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">Indian Institute of Technology Madras</h3>
            <p className="text-indigo-600 dark:text-indigo-300 font-medium mb-1">Diploma in Programming and Data Science</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Chennai, India</p>
            <a
              href="https://www.iitm.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 btn-primary"
            >
              View Institute
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Resume;