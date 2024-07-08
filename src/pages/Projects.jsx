import React from 'react';
import { Dumbbell, Code, ShieldCheck, ShoppingCart, Loader } from 'lucide-react';

const ProjectCard = ({ title, icon: Icon, description, skills }) => (
  <div className="bg-emerald-100 rounded-lg p-6 mb-6 shadow-md">
    <div className="flex items-center mb-4">
      <div className="bg-emerald-500 p-3 rounded-full mr-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-emerald-800">{title}</h2>
    </div>
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <p className="text-emerald-700 mb-4">{description}</p>
      </div>
      <div className="flex-1 bg-white rounded-lg p-4 shadow-inner">
        <p className="text-emerald-600 font-semibold mb-2">Image Placeholder</p>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-emerald-700 mb-2">Skills:</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Projects = ({ activePopup, onClose }) => {
  const content = {
    netMauiApp: (
      <ProjectCard
        title=".NET MAUI Mobile Application"
        icon={Dumbbell}
        description="This mobile application leverages .NET MAUI and Camera.MAUI for real-time QR and barcode scanning, providing users with immediate access to web resources by scanning codes. The app features a dynamic UI, promoting a seamless interaction experience through responsive design and intuitive navigation capabilities."
        skills={['C#', 'Xamarin', '.NET MAUI', 'Camera.MAUI']}
      />
    ),
    interactivePortfolio: (
      <ProjectCard
        title="3D Interactive Portfolio"
        icon={Code}
        description="My portfolio is a unique blend of 3D web development, incorporating Three.js, React, HTML, CSS, and Blender. It features a fully interactive 3D environment, complete with animations and a mini-game. This project not only showcases my skills but also enhances the user experience by making information accessible through engaging, interactive elements."
        skills={['Three.js', 'React', 'HTML', 'CSS', 'Blender']}
      />
    ),
    securityPlayground: (
      <ProjectCard
        title="Security Playground: SQL Injections and XSS"
        icon={ShieldCheck}
        description="Designed as an educational tool, this project simulates a secure testing environment where users can experiment with SQL injections and XSS attacks using React and SQLite. Inspired by SQLrand, it implements custom defenses against SQL injections, including a novel use of Caesar ciphers to encrypt sensitive SQL commands, enhancing security across web applications."
        skills={['React', 'SQLite', 'SQL', 'Security']}
      />
    ),
    ecommerceIntegration: (
      <ProjectCard
        title="E-commerce Integration with NetSuite"
        icon={ShoppingCart}
        description="In this project, I developed an e-commerce platform using WordPress and WooCommerce integrated with NetSuite Oracle. The platform includes a custom API that enhances user experience by enabling real-time tracking of orders and automated product updates based on inventory checks, streamlining the shopping process."
        skills={['WordPress', 'WooCommerce', 'NetSuite Oracle', 'API Development']}
      />
    ),
    upcomingProject: (
      <ProjectCard
        title="Upcoming Project: Fitness Application"
        icon={Loader}
        description="My upcoming project involves creating a machine learning-driven fitness application that personalizes workout and nutrition plans. This application will utilize TensorFlow for its recommendation systems, providing users with tailored fitness and meal plans that evolve based on their individual progress."
        skills={['Machine Learning', 'TensorFlow', 'Fitness', 'Nutrition']}
      />
    )
  };

  if (!activePopup) return null;

  return (
    <div className="bg-emerald-50 rounded-xl p-8 max-w-4xl mx-auto overflow-y-auto max-h-full">
      {content[activePopup]}
      <button 
        onClick={onClose}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition-colors mt-6"
      >
        Close
      </button>
    </div>
  );
};

export default Projects;