import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { memo, useCallback, useRef, useEffect, useState } from 'react';
import { gsap } from '../utils/gsap';

const CONTACTS = [
  { icon: <FaLinkedin />, label: 'LinkedIn', value: 'surajskrv', href: 'https://linkedin.com/in/surajskr', accent: 'bg-blue-500' },
  { icon: <FaGithub />, label: 'GitHub', value: 'surajskrv', href: 'https://github.com/surajskrv', accent: 'bg-gray-800 dark:bg-gray-600' },
  { icon: <FaEnvelope />, label: 'Email', value: 'surajskrv@gmail.com', href: 'mailto:surajskrv@gmail.com?subject=Portfolio Contact', accent: 'bg-rose-500' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Patna, India', href: null, accent: 'bg-emerald-500' },
];

const Contact = memo(function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.contact-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-header',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Left Column cards
      gsap.fromTo('.contact-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-cards-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Right Column Form Card
      gsap.fromTo('.contact-form-wrapper',
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-wrapper',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateField = (name, value) => {
    let err = '';
    if (name === 'name') {
      if (value.trim().length < 2) err = 'Name must be at least 2 characters';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) err = 'Email is required';
      else if (!emailRegex.test(value)) err = 'Invalid email address';
    } else if (name === 'message') {
      if (value.trim().length < 10) err = 'Message must be at least 10 characters';
    }
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErr = form.name.trim().length < 2 ? 'Name must be at least 2 characters' : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailErr = !form.email.trim() ? 'Email is required' : (!emailRegex.test(form.email) ? 'Invalid email address' : '');
    const messageErr = form.message.trim().length < 10 ? 'Message must be at least 10 characters' : '';

    if (nameErr || emailErr || messageErr) {
      setErrors({ name: nameErr, email: emailErr, message: messageErr });
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback in local development if backend routes aren't loaded/running
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.warn('Vercel serverless function not running. Simulating successful send...');
        setTimeout(() => {
          setIsSubmitted(true);
          setForm({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
      } else {
        setSubmitError(err.message || 'Unable to send message. Please try again or email directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="w-full max-w-5xl mx-auto py-12 sm:py-16 px-4 sm:px-6 relative">
      {/* Header */}
      <div className="contact-header mb-12 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">Contact</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
          Let's work <span className="gradient-text">together</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">Reach out through any of these channels — I'd love to connect.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Contact Cards Grid */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="contact-cards-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACTS.map((c) => {
              const Tag = c.href ? 'a' : 'div';
              const linkProps = c.href ? {
                href: c.href,
                target: c.href.startsWith('http') || c.href.startsWith('mailto') ? '_blank' : undefined,
                rel: c.href.startsWith('http') ? 'noopener noreferrer' : undefined,
              } : {};

              return (
                <Tag key={c.label}
                  {...linkProps}
                  className="contact-card group p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-accent-light dark:hover:border-accent-light-dark transition-all duration-300 hover:-translate-y-1 block text-left"
                >
                  <div className={`w-10 h-10 ${c.accent} rounded-xl flex items-center justify-center text-white text-sm mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {c.icon}
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{c.label}</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{c.value}</p>
                </Tag>
              );
            })}
          </div>

          {/* Additional visual bio box */}
          <div className="p-5 rounded-2xl bg-accent-light dark:bg-accent-light-dark border border-accent/10 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">Direct Queries</span>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions or opportunities, feel free to reach out. I'd be happy to connect!
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 contact-form-wrapper">
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-xl relative overflow-hidden">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mb-4 text-emerald-500 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-800">
                  <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-display font-bold text-gray-900 dark:text-white mb-1.5">Message Sent Successfully!</h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                  Thank you for reaching out. Your mock email has been registered, and I will connect with you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <h3 className="text-base sm:text-lg font-display font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                  Send a Message
                </h3>

                {/* Name field */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer transition-colors
                      ${errors.name 
                        ? 'border-red-500 dark:border-red-500/80 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-800 focus:border-accent dark:focus:border-accent'
                      }`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-accent peer-focus:dark:text-accent font-semibold"
                  >
                    Your Name
                  </label>
                  {errors.name && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.name}</p>}
                </div>

                {/* Email field */}
                <div className="relative z-0 w-full group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer transition-colors
                      ${errors.email 
                        ? 'border-red-500 dark:border-red-500/80 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-800 focus:border-accent dark:focus:border-accent'
                      }`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-accent peer-focus:dark:text-accent font-semibold"
                  >
                    Email Address
                  </label>
                  {errors.email && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.email}</p>}
                </div>

                {/* Subject field */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-800 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-accent dark:focus:border-accent peer transition-colors"
                    placeholder=" "
                  />
                  <label
                    htmlFor="subject"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-accent peer-focus:dark:text-accent font-semibold"
                  >
                    Subject (Optional)
                  </label>
                </div>

                {/* Message field */}
                <div className="relative z-0 w-full group">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer transition-colors resize-none
                      ${errors.message 
                        ? 'border-red-500 dark:border-red-500/80 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-800 focus:border-accent dark:focus:border-accent'
                      }`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="message"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-accent peer-focus:dark:text-accent font-semibold"
                  >
                    Your Message
                  </label>
                  {errors.message && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.message}</p>}
                </div>

                {submitError && (
                  <p className="text-xs text-red-500 font-semibold bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-200/50 dark:border-red-500/20">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg shadow-accent/15 cursor-pointer border-none
                    ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={12} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;