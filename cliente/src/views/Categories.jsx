import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";


import Monitors from "../utils/images/CategoriesIcons/Monitors.png";
import Headsets from "../utils/images/CategoriesIcons/Headsets.png";
import Keyboards from "../utils/images/CategoriesIcons/Keyboards.png";
import Mice from "../utils/images/CategoriesIcons/Mice.png";
import Mousepads from "../utils/images/CategoriesIcons/Mousepads.png";
import Controllers from "../utils/images/CategoriesIcons/Controllers.png";
import Earbuds from "../utils/images/CategoriesIcons/Earbuds.png";
import Microphones from "../utils/images/CategoriesIcons/Microphones.png";



const Categories = () => {

  const categoryImages = [
    { name: "Headsets", image: Headsets },
    { name: "Monitors", image: Monitors },
    { name: "Mice", image: Mice },
    { name: "Keyboards", image: Keyboards },
    { name: "Mousepads", image: Mousepads },
    { name: "Controllers", image: Controllers },
    { name: "Earbuds", image: Earbuds },
    { name: "Microphones", image: Microphones },
  ]

  return (
    <>
      
      <div>
        <h1>Selecciona una categoría</h1>
      </div>

      <div className="flex flex-col items-center max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 gap-4 ">
          {categoryImages.map((category, index) => (
            <Link to={`/Search?category=${category.name}`} key={index}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col justify-center items-center m-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 object-cover mb-2"
                  />
                {category.name}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* 
        <Link to="/categories">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Volver a Categorías
          </button>
        </Link> 
      */}

    </>
  );

};

export default Categories;