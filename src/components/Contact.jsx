import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const CONTACTS = [
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/surajskrv',
    href: 'https://linkedin.com/in/surajskrv',
    color: 'bg-blue-500',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'github.com/surajskrv',
    href: 'https://github.com/surajskrv',
    color: 'bg-gray-800',
  },
];

function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSent(false);
    emailjs
      .sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form.current,
        'YOUR_USER_ID'
      )
      .then(
        (result) => {
          setSent(true);
          setLoading(false);
        },
        (error) => {
          setError('Failed to send message. Please try again.');
          setLoading(false);
        }
      );
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-4">Get In Touch</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          I'm always interested in hearing about new opportunities and exciting projects. 
          Feel free to reach out if you'd like to connect!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Let's Connect</h3>
          
          <div className="space-y-4">
            {CONTACTS.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-xl">{contact.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{contact.label}</p>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Send Message</h3>
          
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell me about your project or opportunity..."
                required
                rows={5}
                className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane className="group-hover:animate-pulse" />
              {loading ? 'Sending Message...' : 'Send Message'}
            </motion.button>
            
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <p className="text-green-600 dark:text-green-400 font-medium">
                  ✅ Message sent successfully! I'll get back to you soon.
                </p>
              </motion.div>
            )}
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p className="text-red-600 dark:text-red-400 font-medium">
                  ❌ {error}
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;