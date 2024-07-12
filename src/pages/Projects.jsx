import React from 'react';
import { Dumbbell, ShoppingCart } from 'lucide-react';
import { project1, project2 } from '../../public';

const ProjectCard = ({ title, icon: Icon, description, skills, image }) => (
  <div className="bg-emerald-100 rounded-lg shadow-lg flex flex-col h-full">
    <div className="bg-emerald-400 p-4 rounded-t-lg">
      <div className="flex items-center">
        <div className="bg-white p-4 rounded-full mr-5">
          <Icon className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
    </div>
    <div className="flex-grow p-8">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        <div className="flex-[6] flex flex-col">
          <p className="text-emerald-700 mb-6 text-xl leading-relaxed flex-grow">{description}</p>
          <div className="mt-auto">
            <h3 className="text-xl font-semibold text-emerald-700 mb-3">Skills:</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span key={index} className="bg-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-[4]">
          <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  </div>
);

const Projects = ({ activePopup, onClose }) => {
  const content = {
    interactivePortfolio: (
      <ProjectCard
        title="3D Interactive Portfolio"
        icon={Dumbbell}
        description="My portfolio is a unique blend of 3D web development, incorporating Three.js, React, HTML, CSS, and Blender. It features a fully interactive 3D environment, complete with animations and a mini-game. This project not only showcases my skills but also enhances the user experience by making information accessible through engaging, interactive elements."
        skills={['Three.js', 'React', 'HTML', 'CSS', 'Blender']}
        image={project1}
      />
    ),
    ecommerceIntegration: (
      <ProjectCard
        title="E-commerce Integration with NetSuite"
        icon={ShoppingCart}
        description="In this project, I developed an e-commerce platform using WordPress and WooCommerce integrated with NetSuite Oracle. The platform includes a custom API that enhances user experience by enabling real-time tracking of orders and automated product updates based on inventory checks, streamlining the shopping process."
        skills={['WordPress', 'WooCommerce', 'NetSuite Oracle', 'API']}
        image={project2}
      />
    ),
  };

  if (!activePopup) return null;

  return (
    <div className="bg-emerald-50 rounded-xl p-10 mx-auto overflow-y-auto h-full flex flex-col">
      <div className="flex-grow mb-8">
        {content[activePopup]}
      </div>
      <div className="flex justify-start mt-auto">
        <button 
          onClick={onClose}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Projects;