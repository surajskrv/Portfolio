import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const CONTACTS = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'surajskrv@gmail.com',
    href: 'mailto:surajskrv@gmail.com',
  },
  {
    icon: <FaPhone />,
    label: 'Phone',
    value: '+91 90317 30330',
    href: 'tel:+919031730330',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/surajskrv',
    href: 'https://linkedin.com/in/surajskrv',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'github.com/surajskrv',
    href: 'https://github.com/surajskrv',
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
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="section-padding"
    >
      <div className="card">
        <h2 className="text-3xl font-bold gradient-text mb-6 text-center">Contact</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Contact Info */}
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-lg transition"
              >
                <span className="text-2xl">{c.icon}</span>
                <span>{c.value}</span>
              </a>
            ))}
          </div>
          {/* Contact Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex-1 flex flex-col gap-4 bg-gray-100 dark:bg-gray-950 p-3 rounded-xl border border-gray-300 dark:border-gray-800 shadow"
          >
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded px-4 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded px-4 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={4}
              className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded px-4 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {sent && <p className="text-green-600 dark:text-green-400">Message sent successfully!</p>}
            {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
          </form>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;