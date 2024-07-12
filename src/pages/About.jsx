import React, {useState} from 'react';
import { Dumbbell, Briefcase, GraduationCap } from 'lucide-react';
import { leetcode, github, linkedin, document, resume } from '../../public';

const AboutSection = ({ title, icon: Icon, children }) => (
  <div className="bg-gray-200 rounded-lg p-6 mb-6 shadow-md flex-grow flex flex-col">
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 mr-3 text-blue-600" />
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="flex-grow">
      {children}
    </div>
  </div>
);

const About = ({ activePopup, onClose }) => {
  const [showResume, setShowResume] = useState(false);
  const content = {
    aboutMe: (
      <AboutSection title="About Me" icon={Dumbbell}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-[7] md:pr-4">
            <p className="text-gray-700 mb-4 text-lg">
              Hey, I'm Eric Xiao, a student-athlete at Brandeis University pursuing a BS in Computer Science with a minor in Economics. I'm passionate about Data Science and Machine Learning, always looking to merge analytical skills with practical applications in the field of computer science. 
            </p>
          </div>
          <div className="flex-[3] flex justify-center items-center">
            <div className="flex flex-col gap-4">
              <a
                href="https://leetcode.com/u/exiao312/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={leetcode} alt="LeetCode" className="w-12 h-12" />
              </a>
              <a
                href="https://github.com/ericX08"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={github} alt="GitHub" className="w-12 h-12" />
              </a>
              <a
                href="https://www.linkedin.com/in/ericxiao-cs/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={linkedin} alt="LinkedIn" className="w-12 h-12" />
              </a>
              <button
                onClick={() => setShowResume(true)}
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={document} alt="document" className="w-12 h-12" />
              </button>
            </div>
          </div>
        </div>
      </AboutSection>
    ),
    experience: (
      <AboutSection title="Experience" icon={Briefcase}>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Arbin Instruments, College Station, TX — Software Engineer Intern</h3>
            <p className="text-gray-600 mb-2">May 2023 - August 2023</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Developed interactive and responsive website pages using React, HTML, and CSS</li>
              <li>Created software features for SQL data filtering and visualization using C# and Python</li>
              <li>Designed a feature for cloning PDF files and converting them to Word format</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Arbin Instruments, College Station, TX — Software Engineer Intern</h3>
            <p className="text-gray-600 mb-2">May 2024 - August 2024</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Designed and implemented an API to integrate with NetSuite Oracle</li>
              <li>Developed a comprehensive website for enhanced customer experience</li>
            </ul>
          </div>
        </div>
      </AboutSection>
    ),
    education: (
      <AboutSection title="Education" icon={GraduationCap}>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Brandeis University — Pursuing a BS</h3>
            <p className="text-gray-600 mb-2">August 2022 - December 2025: Waltham, MA</p>
            <p className="text-gray-700">Major in Computer Science, Minor in Economics. GPA: 3.7/4.0</p>
            <p className="text-gray-700 mt-2">Relevant Courses: Intro to Python, Advanced Programming Techniques in Java, Data Structures, Intro to Computer Security</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Student Athlete - Brandeis University Varsity Swimming</h3>
            <p className="text-gray-600 mb-2">August 2022 - Present</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Exhibited discipline by consistently committing to every practice</li>
              <li>Enhanced team performance by guiding teammates in strengthening techniques</li>
            </ul>
          </div>
        </div>
      </AboutSection>
    )
  };

  if (!activePopup) return null;

  return (
    <div className="bg-white rounded-xl p-8 mx-auto overflow-y-auto h-full flex flex-col">
      <div className="flex-grow flex flex-col mb-8">
        {content[activePopup]}
      </div>
      <div className="flex justify-start mt-auto">
        <button 
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Close
        </button>
      </div>
      {showResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-100">
            <h2 className="text-2xl font-bold mb-4">Resume</h2>
            <iframe src={resume} className="w-full h-96 mb-4" />
            <div className="flex justify-between">
              <a
                href={resume}
                download
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Download Resume
              </a>
              <button
                onClick={() => setShowResume(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;