import { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';

export default function NotFound() {
  const [particles, setParticles] = useState([]);

  // Generate decorative background elements
  useEffect(() => {
    const items = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(items);
  }, []);

  const handleGoHome = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-950 px-4 py-16 overflow-hidden select-none transition-colors duration-300">
      {/* Ambient glow mesh */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 dark:bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Floating dot particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-accent/20 dark:bg-accent/10 animate-pulse"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg p-8 sm:p-12 rounded-3xl bg-white/70 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/5 shadow-2xl backdrop-blur-md text-center">
        {/* 404 Accent Display */}
        <h1 className="text-8xl sm:text-9xl font-display font-black tracking-tighter leading-none mb-4 select-none">
          <span className="bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent">4</span>
          <span className="text-gray-900 dark:text-white">0</span>
          <span className="bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent">4</span>
        </h1>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
          Lost in Space?
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-sm mx-auto mb-8 leading-relaxed">
          The page you are looking for doesn't exist, has been removed, or moved to another URL.
        </p>

        {/* Action Button */}
        <a
          href="/"
          onClick={handleGoHome}
          className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-2xl transition-all duration-300 text-sm shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 cursor-pointer decoration-none"
        >
          <FaHome className="text-base group-hover:scale-110 transition-transform duration-300" />
          <span>Return Home</span>
        </a>
      </div>
    </div>
  );
}
