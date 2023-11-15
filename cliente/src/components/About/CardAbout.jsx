import React from "react";

const CardAbout = ({ name, image, github, linkedin, description }) => {
  return (
    <div className="bg-gray-200 border border-gray-300 shadow-md rounded p-4 text-black transform transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-180 cursor-grab mx-2 my-2">
      <div className=" bg-purple-500 text-white text-sm uppercase font-semibold mb-2">{description}</div>
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-56 h-56 rounded-full mx-auto mb-2"
        />
        <h3 className="text-lg font-bold">{name}</h3>
      </div>
      
      <div className="flex flex-col gap-4 items-center mt-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
      </div>
    </div>
  );
};

export default CardAbout;