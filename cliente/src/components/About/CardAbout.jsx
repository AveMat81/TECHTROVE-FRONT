import React from "react";

const CardAbout = ({ name, image, github, linkedin, description }) => {
  return (
    <div className="bg-gray-200 border border-gray-300 shadow-md rounded p-4 text-black transform transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-180 cursor-grab">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-56 h-56 rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-bold">{name}</h3>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 p-4 flex flex-col items-center justify-around transform transform-style-preserve-3d transition-transform duration-500">
        <p className="text-sm uppercase text-gray-700 font-semibold hidden rotate-y-180">
          {description}
        </p>
        <div className="flex flex-col gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardAbout;