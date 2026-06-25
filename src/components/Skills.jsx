import { FaPython, FaJs, FaHtml5, FaCss3Alt, FaDatabase, FaJava } from 'react-icons/fa';
import { SiNodedotjs, SiExpress, SiMongodb, SiFlask, SiPostman, SiTailwindcss } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { FaGithubSquare, FaVuejs, FaReact } from 'react-icons/fa';
import { TbApi } from "react-icons/tb";
import { DiBootstrap } from "react-icons/di";
import { useEffect, useRef, useState, memo } from 'react';
import { gsap } from '../utils/gsap';

const allSkills = [
  { name: 'JavaScript', icon: <FaJs />, color: 'text-yellow-500', glow: 'hover:shadow-yellow-500/15 hover:border-yellow-500/40' },
  { name: 'React', icon: <FaReact />, color: 'text-cyan-500', glow: 'hover:shadow-cyan-500/15 hover:border-cyan-500/40' },
  { name: 'Vue.js', icon: <FaVuejs />, color: 'text-emerald-500', glow: 'hover:shadow-emerald-500/15 hover:border-emerald-500/40' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: 'text-green-600', glow: 'hover:shadow-green-600/15 hover:border-green-600/40' },
  { name: 'Python', icon: <FaPython />, color: 'text-blue-500', glow: 'hover:shadow-blue-500/15 hover:border-blue-500/40' },
  { name: 'Flask', icon: <SiFlask />, color: 'text-gray-600 dark:text-gray-300', glow: 'hover:shadow-gray-400/20 hover:border-gray-400/40' },
  { name: 'Express', icon: <SiExpress />, color: 'text-gray-600 dark:text-gray-300', glow: 'hover:shadow-gray-400/20 hover:border-gray-400/40' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-600', glow: 'hover:shadow-green-600/15 hover:border-green-600/40' },
  { name: 'SQL', icon: <FaDatabase />, color: 'text-blue-500', glow: 'hover:shadow-blue-500/15 hover:border-blue-500/40' },
  { name: 'HTML', icon: <FaHtml5 />, color: 'text-orange-500', glow: 'hover:shadow-orange-500/15 hover:border-orange-500/40' },
  { name: 'CSS', icon: <FaCss3Alt />, color: 'text-blue-600', glow: 'hover:shadow-blue-600/15 hover:border-blue-600/40' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-cyan-500', glow: 'hover:shadow-cyan-500/15 hover:border-cyan-500/40' },
  { name: 'Bootstrap', icon: <DiBootstrap />, color: 'text-purple-600', glow: 'hover:shadow-purple-600/15 hover:border-purple-600/40' },
  { name: 'Java', icon: <FaJava />, color: 'text-orange-600', glow: 'hover:shadow-orange-600/15 hover:border-orange-600/40' },
  { name: 'REST APIs', icon: <TbApi />, color: 'text-blue-500', glow: 'hover:shadow-blue-500/15 hover:border-blue-500/40' },
  { name: 'Git', icon: <FaGithubSquare />, color: 'text-gray-700 dark:text-gray-300', glow: 'hover:shadow-gray-500/15 hover:border-gray-500/40' },
  { name: 'VS Code', icon: <VscVscode />, color: 'text-blue-600', glow: 'hover:shadow-blue-600/15 hover:border-blue-600/40' },
  { name: 'Postman', icon: <SiPostman />, color: 'text-orange-500', glow: 'hover:shadow-orange-500/15 hover:border-orange-500/40' },
];

const categories = [
  {
    title: 'Frontend Development',
    skills: allSkills.filter(s => ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Tailwind', 'Bootstrap'].includes(s.name))
  },
  {
    title: 'Backend & Databases',
    skills: allSkills.filter(s => ['Python', 'Flask', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Java', 'REST APIs'].includes(s.name))
  },
  {
    title: 'Tools & Platforms',
    skills: allSkills.filter(s => ['Git', 'VS Code', 'Postman'].includes(s.name))
  }
];

const softSkills = ['Communication', 'Time Management', 'Team Work', 'Adaptability', 'Emotional Intelligence', 'Decision Making', 'Work Ethic', 'Empathy'];

function MarqueeRow({ skills, reverse = false }) {
  const doubled = [...skills, ...skills];
  return (
    <div className="overflow-hidden relative group select-none">
      <div className={`flex gap-3 will-change-transform ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}>
        {doubled.map((skill, i) => (
          <div key={`${skill.name}-${i}`}
            className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default ${skill.glow}`}>
            <span className={`text-base sm:text-lg ${skill.color}`}>{skill.icon}</span>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{skill.name}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
    </div>
  );
}

const Skills = memo(function Skills() {
  const sectionRef = useRef(null);
  const [viewMode, setViewMode] = useState('marquee');

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-header',
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo('.skills-marquee-container',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-marquee-container',
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo('.skills-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-bottom',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full max-w-5xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
      {/* Header with Switcher */}
      <div className="skills-header mb-12 flex flex-col text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">Skills</p>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
            Tech I work <span className="gradient-text">with</span>
          </h2>
          
          {/* Switcher Toggle */}
          <div className="flex items-center gap-1 bg-gray-100/70 dark:bg-white/[0.04] p-1 rounded-2xl select-none border border-gray-200/50 dark:border-white/5">
            <button
              onClick={() => setViewMode('marquee')}
              className={`cursor-pointer transition-all duration-300 font-bold px-4 py-2 rounded-xl text-[11px] sm:text-xs border-none bg-transparent
                ${viewMode === 'marquee'
                  ? 'text-accent bg-white dark:bg-white/10 shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                }`}
            >
              Scroll Mode
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`cursor-pointer transition-all duration-300 font-bold px-4 py-2 rounded-xl text-[11px] sm:text-xs border-none bg-transparent
                ${viewMode === 'grid'
                  ? 'text-accent bg-white dark:bg-white/10 shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                }`}
            >
              Dashboard Grid
            </button>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">Languages, frameworks, and tools in my daily toolkit.</p>
      </div>

      {/* Main Section Content */}
      <div className="min-h-[220px]">
        {viewMode === 'marquee' ? (
          <div className="skills-marquee-container space-y-3 mb-12 animate-in fade-in duration-300">
            <MarqueeRow skills={allSkills.slice(0, 9)} />
            <MarqueeRow skills={allSkills.slice(9)} reverse />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in duration-300 text-left">
            {categories.map((cat, idx) => (
              <div key={idx}
                className="p-5 rounded-2xl bg-white/70 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-sm flex flex-col">
                <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-4 border-b border-gray-100 dark:border-gray-800/80 pb-2">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, i) => (
                    <div key={i}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-950/70 border border-gray-200/50 dark:border-gray-800 shadow-sm transition-all duration-300 select-none ${skill.glow}`}>
                      <span className={`text-sm ${skill.color}`}>{skill.icon}</span>
                      <span className="text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Soft Skills + What I Bring */}
      <div className="skills-bottom grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="skills-card p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Soft Skills</p>
          <div className="flex flex-wrap gap-2">
            {softSkills.map(skill => (
              <span key={skill}
                className="chip cursor-default hover:scale-105 hover:border-accent-light dark:hover:border-accent-light-dark transition-all duration-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="skills-card p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">What I Bring</p>
          <ul className="space-y-3">
            {[
              'Strong foundation in modern web development technologies.',
              'Full-stack development and API integration experience.',
              'Quick learner who adapts rapidly to new technologies.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default Skills;