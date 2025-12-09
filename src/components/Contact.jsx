import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaMailBulk, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const CONTACTS = [
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/surajskrv',
    href: 'https://linkedin.com/in/surajskr',
    color: 'bg-blue-500',
    description: 'Connect with me on LinkedIn for professional networking and opportunities.',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'github.com/surajskrv',
    href: 'https://github.com/surajskrv',
    color: 'bg-gray-800',
    description: 'Check out my projects and contributions on GitHub.',
  },
  {
    icon: <FaMailBulk />,
    label: 'Email',
    value: 'surajskrv@gmail.com',
    href: 'mailto:surajskrv@gmail.com?subject=Portfolio Contact&body=Hi Suraj,%0D%0A%0D%0AI would like to discuss a project opportunity with you.%0D%0A%0D%0ABest regards,',
    color: 'bg-red-500',
    description: 'Send me an email for project inquiries and collaborations.',
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Location',
    value: 'Patna, India',
    href: '#',
    color: 'bg-green-500',
    description: 'Based in Patna, India. Open to remote opportunities worldwide.',
  },
];

function Contact() {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-4">Get In Touch</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          I'm always interested in hearing about new opportunities and exciting projects. 
          Feel free to reach out through any of the channels below!
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CONTACTS.map((contact, index) => (
          <motion.div
            key={contact.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <motion.a
              href={contact.href}
              target={contact.href.startsWith('http') || contact.href.startsWith('mailto') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block h-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${contact.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4 mx-auto`}>
                <span className="text-white text-2xl">{contact.icon}</span>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {contact.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                  {contact.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
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
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-12"
      >
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Ready to Start a Project?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Whether you have a project in mind or just want to chat about technology, 
            I'd love to hear from you. Let's create something amazing together!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:surajskrv@gmail.com?subject=Project Inquiry&body=Hi Suraj,%0D%0A%0D%0AI have a project I'd like to discuss with you.%0D%0A%0D%0ABest regards,"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMailBulk />
              Send Email
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/surajskr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
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