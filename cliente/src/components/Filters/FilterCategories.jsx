import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import getFilter from "../../redux/actions/getFilter";
import {useDispatch} from "react-redux"
import {useState} from "react"
import { setCategory } from "../../redux/slices/categorySlice";
import Loading from "../../views/Loading";



const CategoriesFilter = ({handlerSearch, setCurrentCategory, funcion, funcionFilter}) => {
    const dispatch = useDispatch();
    const [selectCategory, setSelectCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
  const handleSelection = async (category) => {
    setCurrentCategory()
    // funcion()
    // funcionFilter()
    setIsLoading(true);
    setSelectCategory(category);
    handlerSearch()
    try {
      await dispatch(setCategory({ category: category }));
      await dispatch(getFilter({ category: category }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error en la acción:", error);
      setIsLoading(false);
    }

  };
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra 3 elementos a la vez
    slidesToScroll: 1, // Desplaza 1 elemento a la vez
    swipeToSlide: true,
    centerMode: true,
    focusOnSelect: true,
  };

  const getImageForCategory = (category) => {
    // Supongamos que tienes una estructura de datos o un mapeo de categorías a sus respectivas imágenes
    const categoryImages = {
      Monitors: "https://i.postimg.cc/xjXTwHc6/monitor-9678589-7924228.png",
      Headsets: "https://i.postimg.cc/xdsn7TYr/gaming-headset-7480997-6138641.png",
      Keyboards: "https://i.postimg.cc/DysfZTQs/keyboard-gaming-6013628-4979944.png",
      Mice: "https://i.postimg.cc/1Rb5stFs/gaming-mouse-5756086-4818641.png",
      Mousepads: "https://i.postimg.cc/cHHDyF8k/Mousepads.png",
      Controllers: "https://i.postimg.cc/Xqzjn1J2/Controllers.png",
      Earbuds: "https://i.postimg.cc/L4YLZck6/Earbuds.png",
      Microphones: "https://i.postimg.cc/3xKk9VGG/Microphones.png",
    };
  
    
    return categoryImages[category] || ""; 
  };

  return (
    <div className="w-auto">
      {isLoading && <Loading />}
      <Slider {...settings} className="mx-auto border-blue-200 ">
        {["Monitors", "Headsets", "Keyboards", "Mice", "Mousepads", "Controllers", "Earbuds", "Microphones"].map((category) => (
          <div key={category} className="flex justify-center items-center">
            <button
              onClick={() => handleSelection(category)}
              className={`w-[90px] h-[70px] rounded-xl  border-blue-200 flex flex-col justify-center items-center ${
                selectCategory === category ? "bg-blue-300" : ""
              }`}
              style={{ borderRadius: '50px' }}
            >
              <img
                src={getImageForCategory(category)}
                alt={`${category} icon`}
                className="w-[50px] h-[50px]"
  />
              <div className="font-jakarta-sans font-semibold text-stone-900 text-[13px]">{category}</div>
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoriesFilter;
