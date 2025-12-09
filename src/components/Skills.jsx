import { FaPython, FaJs, FaHtml5, FaCss3Alt, FaDatabase, FaJava } from 'react-icons/fa';
import { SiNodedotjs, SiExpress, SiMongodb, SiFlask, SiPostman, SiTailwindcss } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { FaGithubSquare, FaVuejs, FaReact } from 'react-icons/fa';
import { TbApi } from "react-icons/tb";
import { DiBootstrap } from "react-icons/di";


const technicalSkills = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
      { name: 'Python', icon: <FaPython className="text-blue-400" /> },
      { name: 'Java', icon: <FaJava className="text-orange-500" /> },
    ],
  },
  {
    category: 'Web Development',
    skills: [
      { name: 'Vuejs', icon: <FaVuejs className="text-green-400" /> },
      { name: 'React', icon: <FaReact className="text-blue-500" /> },
      { name: 'HTML', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" /> },
      { name: 'Express', icon: <SiExpress className="text-gray-800 dark:text-gray-300" /> },
      { name: 'RESTful APIs', icon: <TbApi className="text-blue-400" /> },
      { name: 'Flask', icon: <SiFlask className="text-gray-800 dark:text-gray-300" /> },
      { name: 'BootStrap', icon: <DiBootstrap className="text-purple-700" /> },
      { name: 'Tailwind', icon: <SiTailwindcss className="text-blue-600" /> },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
      { name: 'SQL', icon: <FaDatabase className="text-blue-300" /> },
    ],
  },
  {
    category: 'Other Tecnologies',
    skills: [
      { name: 'Git/GitHub', icon: <FaGithubSquare className="text-gray-700 dark:text-gray-300" /> },
      { name: 'VsCode', icon: <VscVscode className="text-blue-400" /> },
      { name: 'Postman', icon: <SiPostman className="text-orange-500" /> },
    ],
  },
];

const softSkills = [
  'Communication',
  'Time Management',
  'Team Collaboration',
  'Adaptability',
  'Emotional Intelligence',
  'Decision Making',
  'Work Ethic',
  'Empathy'
];

const whatIBring = [
  'Strong foundation in modern web development technologies.',
  'Experience with full-stack development and API integration.',
  'Quick learner with ability to adapt to new technologies.',
];

function Skills() {
  return (
    <section className="w-full max-w-6xl mx-auto section-padding">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Technical Skills */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold gradient-text mb-8">Technical Skills</h2>
          <div className="space-y-8">
            {technicalSkills.map((cat) => (
              <div key={cat.category} className="card p-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">{cat.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium text-base shadow-sm border border-gray-300 dark:border-gray-700"
                    >
                      <span className="text-xl">{skill.icon}</span>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Soft Skills and What I Bring */}
        <div className="flex-1 space-y-8">
          {/* Soft Skills */}
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-8">Soft Skills</h2>
            <div className="card grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {softSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 font-medium text-base shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* What I Bring */}
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-8">What I Bring</h2>
            <div className="card p-4">
              <ul className="space-y-3">
                {whatIBring.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                    <span className="h-2 w-2 rounded-full bg-blue-500 inline-block mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;