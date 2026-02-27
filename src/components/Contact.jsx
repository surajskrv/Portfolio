import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaMailBulk, FaMapMarkerAlt } from 'react-icons/fa';

const CONTACTS = [
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/surajskrv',
    href: 'https://linkedin.com/in/surajskr',
    color: 'from-blue-500 to-blue-600',
    glowColor: 'hover:shadow-blue-500/20',
    description: 'Connect with me on LinkedIn for professional networking and opportunities.',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'github.com/surajskrv',
    href: 'https://github.com/surajskrv',
    color: 'from-gray-700 to-gray-800',
    glowColor: 'hover:shadow-gray-500/20',
    description: 'Check out my projects and contributions on GitHub.',
  },
  {
    icon: <FaMailBulk />,
    label: 'Email',
    value: 'surajskrv@gmail.com',
    href: 'mailto:surajskrv@gmail.com?subject=Portfolio Contact&body=Hi Suraj,%0D%0A%0D%0AI would like to discuss a project opportunity with you.%0D%0A%0D%0ABest regards,',
    color: 'from-red-500 to-rose-500',
    glowColor: 'hover:shadow-red-500/20',
    description: 'Send me an email for project inquiries and collaborations.',
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Location',
    value: 'Patna, India',
    href: '#',
    color: 'from-emerald-500 to-green-500',
    glowColor: 'hover:shadow-emerald-500/20',
    description: 'Based in Patna, India. Open to remote opportunities worldwide.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

function Contact() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-display font-bold gradient-text mb-4">Get In Touch</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto">
          I'm always interested in hearing about new opportunities and exciting projects. 
          Feel free to reach out through any of the channels below!
        </p>
      </motion.div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {CONTACTS.map((contact, index) => (
          <motion.div
            key={contact.label}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="group"
          >
            <motion.a
              href={contact.href}
              target={contact.href.startsWith('http') || contact.href.startsWith('mailto') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`block h-full p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/60 dark:border-white/5 hover:border-indigo-300/50 dark:hover:border-indigo-500/20 transition-all duration-300 hover:shadow-xl ${contact.glowColor}`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <motion.div
                className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg transition-transform duration-300`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white text-xl">{contact.icon}</span>
              </motion.div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-display font-bold text-gray-800 dark:text-gray-200 mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {contact.label}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">
                  {contact.value}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                  {contact.description}
                </p>
              </div>
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-14"
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-50/80 via-violet-50/60 to-purple-50/60 dark:from-indigo-900/8 dark:via-violet-900/6 dark:to-purple-900/6 rounded-3xl p-8 md:p-10 border border-indigo-200/30 dark:border-indigo-800/20">
          {/* Floating decorative elements */}
          <div className="absolute top-4 right-8 w-20 h-20 bg-indigo-200/30 dark:bg-indigo-600/5 rounded-full blur-2xl" />
          <div className="absolute bottom-4 left-8 w-16 h-16 bg-purple-200/30 dark:bg-purple-600/5 rounded-full blur-2xl" />
          
          {/* Availability indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Available for opportunities</span>
          </div>

          <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-3">
            Ready to Start a Project?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto text-sm">
            Whether you have a project in mind or just want to chat about technology, 
            I'd love to hear from you. Let's create something amazing together!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:surajskrv@gmail.com?subject=Project Inquiry&body=Hi Suraj,%0D%0A%0D%0AI have a project I'd like to discuss with you.%0D%0A%0D%0ABest regards,"
              target="_blank"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-indigo-400/15 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMailBulk />
              Send Email
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/surajskr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/30 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
              Connect on LinkedIn
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;