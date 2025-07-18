import { FaPython, FaJs, FaHtml5, FaCss3Alt, FaDatabase, FaReact, FaVuejs, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiStreamlit, SiFlask, SiPostgresql, SiPostman, SiOpenai } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { FaGithub } from 'react-icons/fa';

const technicalSkills = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', icon: <FaPython className="text-blue-400" /> },
      { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
      { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'SQL', icon: <FaDatabase className="text-blue-300" /> },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'React.js', icon: <FaReact className="text-cyan-400" /> },
      { name: 'Vue.js', icon: <FaVuejs className="text-green-400" /> },
      { name: 'Streamlit', icon: <SiStreamlit className="text-red-400" /> },
      { name: 'Flask', icon: <SiFlask className="text-gray-300" /> },
    ],
  },
  {
    category: 'Other Technologies',
    skills: [
      { name: 'Git/GitHub', icon: <FaGithub className="text-gray-200" /> },
      { name: 'VS Code', icon: <VscVscode className="text-blue-400" /> },
      { name: 'Postman', icon: <SiPostman className="text-orange-400" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-300" /> },
      { name: 'Docker', icon: <FaDocker className="text-blue-400" /> },
    ],
  },
];

const softSkills = [
  'Problem Solving',
  'Critical Thinking',
  'Communication',
  'Team Collaboration',
  'Time Management',
  'Adaptability',
  'Creativity',
  'Attention to Detail',
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
        {/* Soft Skills */}
        <div className="flex-1">
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
      </div>
    </section>
  );
}

export default Skills;