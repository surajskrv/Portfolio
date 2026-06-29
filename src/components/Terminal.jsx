import { useState, useRef, useEffect } from 'react';

const HELP_TEXT = `Available commands:
  about      - Learn more about me
  skills     - View my technical stack
  projects   - See some of my featured work
  contact    - Get my contact information
  cursor on  - Enable the premium custom cursor
  cursor off - Disable the custom cursor
  clear      - Clear terminal screen`;

const ABOUT_TEXT = `Suraj Kumar — Full Stack Developer
----------------------------------
MCA Student @ IGNOU | programming graduate @ IIT Madras
Focusing on building performant, responsive web apps with MERN & Flask.
Passionate about problem solving, automation, and clean code.`;

const SKILLS_TEXT = `Tech Stack:
  • Languages: JavaScript, Python, Java, HTML, CSS, SQL
  • Frameworks: React, Vue.js, Flask, Express, TailwindCSS, Bootstrap
  • Tools/Databases: MongoDB, SQLite, REST APIs, Git, VS Code, Postman`;

const PROJECTS_TEXT = `Featured Projects:
  1. WheelSpot - Full-stack Parking Booking app (Flask, Vue 3, Celery, SQL)
  2. CuraNet   - Role-based Hospital Management (Vue 3, Flask, SQLite)
  3. Flixxit   - OTT platform streaming experience (MERN Stack)`;

const CONTACT_TEXT = `Get in Touch:
  • Email:    surajskrv@gmail.com
  • LinkedIn: linkedin.com/in/surajskr
  • GitHub:   github.com/surajskrv
  • Location: Patna, India`;

export default function Terminal({ cursorEnabled, setCursorEnabled }) {
  const [history, setHistory] = useState([
    { type: 'output', text: "Welcome to Suraj's portfolio terminal! (v1.0.0)" },
    { type: 'output', text: "Type 'help' or click a suggestion below." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Smooth scroll within the terminal screen only (avoids parent window scrolling)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = '';

    switch (trimmed) {
      case 'help':
        response = HELP_TEXT;
        break;
      case 'about':
        response = ABOUT_TEXT;
        break;
      case 'skills':
        response = SKILLS_TEXT;
        break;
      case 'projects':
        response = PROJECTS_TEXT;
        break;
      case 'contact':
        response = CONTACT_TEXT;
        break;
      case 'cursor on':
        if (setCursorEnabled) setCursorEnabled(true);
        response = 'Premium custom cursor enabled.';
        break;
      case 'cursor off':
        if (setCursorEnabled) setCursorEnabled(false);
        response = 'Custom cursor disabled. Native browser cursor restored.';
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        response = '';
        break;
      default:
        response = `Command not found: '${trimmed}'. Type 'help' for options.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      ...(response ? [{ type: 'output', text: response }] : [])
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
    setInputVal('');
  };

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      onClick={focusInput}
      className="w-full h-[320px] rounded-2xl border border-gray-200/50 dark:border-gray-800 bg-white/70 dark:bg-gray-950/80 shadow-2xl backdrop-blur-md flex flex-col overflow-hidden font-mono text-left text-xs sm:text-[13px] text-gray-700 dark:text-gray-300 cursor-text select-text relative"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/80 select-none">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/90 dark:bg-red-500/80 inline-block border border-red-600/10 shadow-inner hover:brightness-110 transition-all duration-200" />
          <span className="w-3 h-3 rounded-full bg-amber-500/90 dark:bg-amber-500/80 inline-block border border-amber-600/10 shadow-inner hover:brightness-110 transition-all duration-200" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/90 dark:bg-emerald-500/80 inline-block border border-emerald-600/10 shadow-inner hover:brightness-110 transition-all duration-200" />
        </div>
        <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500">suraj@portfolio: ~</span>
        <span className="w-10" />
      </div>

      {/* Screen History */}
      <div
        ref={containerRef}
        className="flex-1 p-4 overflow-y-auto space-y-2 select-text scrollbar-thin scrollbar-thumb-accent"
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {line.type === 'input' ? (
              <span className="text-gray-500 dark:text-gray-400">
                <span className="text-accent font-bold">suraj@portfolio:~$</span> {line.text}
              </span>
            ) : (
              <span className="text-gray-800 dark:text-gray-200">{line.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Input Prompt Form */}
      <form onSubmit={onSubmit} className="flex items-center px-4 py-2.5 bg-gray-100/30 dark:bg-gray-900/10 border-t border-gray-200/30 dark:border-gray-800/30 select-none">
        <span className="text-accent font-bold mr-2">suraj@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none font-mono text-gray-800 dark:text-white p-0 focus:ring-0"
          placeholder="type a command..."
          autoComplete="off"
          autoCapitalize="none"
        />
      </form>

      {/* Suggestions Overlay */}
      <div className="flex items-center flex-wrap gap-1.5 px-4 py-2 bg-gray-100/50 dark:bg-gray-900/50 border-t border-gray-200/50 dark:border-gray-800/50 select-none">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-1">Suggestions:</span>
        {['about', 'skills', 'projects', 'contact', cursorEnabled ? 'cursor off' : 'cursor on', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(cmd);
            }}
            className="px-2 py-0.5 rounded bg-gray-200/70 hover:bg-accent hover:text-white dark:bg-gray-800/80 dark:hover:bg-accent dark:hover:text-white text-gray-600 dark:text-gray-400 font-mono text-[10px] sm:text-xs border-none cursor-pointer transition-colors shadow-sm"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
