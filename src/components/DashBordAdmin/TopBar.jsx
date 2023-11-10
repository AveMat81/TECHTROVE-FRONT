import React, { useState } from "react";

import ActiveHeartImage from "../../utils/images/Logo/TECHTROVE.png";
// import Banner from "./Banner";
import Sidebar from "./Slide";


const TopBar = () => {
  // con este estado cuando se expanda el search se oculta todo
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  //manejo el cambio de enfoque de la barra de búsqueda
  const handleSearchFocus = (focused) => {
    setIsSearchFocused(focused);
  };


  return (
    <div className="top-0 left-0 w-full z-[1000] "> 
    
        <div class="bg-neutral-800 top-0 left-0 font-general-sans w-full h-[86px] justify-around items-center inline-flex bg-neutral-800 border-t border-black border-opacity-20">
            <div class="w-full h-[80px] border-t border-black border-opacity-20 justify-around items-center inline-flex">
        {!isSearchFocused && <Sidebar/>}
        {!isSearchFocused && (
            <img
            src={ActiveHeartImage}
            alt="Active Heart"
            class="absolute top-3 left-16 h-[62px] w-[96px] lg:hidden ml-[86px]"
            />
            )}
            <p class="text-white absolute top-[62px] left-40" >TechTrove</p>  
          <svg class="w-8 h-8 p-0 absolute top-8 right-8" fill="white">
            <path d="M32.047 25c0-9-8-7-8-14 0-0.58-0.056-1.076-0.158-1.498-0.526-3.532-2.88-6.366-5.93-7.23 0.027-0.123 0.041-0.251 0.041-0.382 0-1.040-0.9-1.891-2-1.891s-2 0.851-2 1.891c0 0.131 0.014 0.258 0.041 0.382-3.421 0.969-5.966 4.416-6.039 8.545-0.001 0.060-0.002 0.121-0.002 0.183 0 7-8 5-8 14 0 2.382 5.331 4.375 12.468 4.878 0.673 1.263 2.002 2.122 3.532 2.122s2.86-0.86 3.532-2.122c7.137-0.503 12.468-2.495 12.468-4.878 0-0.007-0.001-0.014-0.001-0.021l0.048 0.021zM25.82 26.691c-1.695 0.452-3.692 0.777-5.837 0.958-0.178-2.044-1.893-3.648-3.984-3.648s-3.805 1.604-3.984 3.648c-2.144-0.18-4.142-0.506-5.837-0.958-2.332-0.622-3.447-1.318-3.855-1.691 0.408-0.372 1.523-1.068 3.855-1.691 2.712-0.724 6.199-1.122 9.82-1.122s7.109 0.398 9.82 1.122c2.332 0.622 3.447 1.318 3.855 1.691-0.408 0.372-1.523 1.068-3.855 1.691z"></path>
          </svg>
        </div>
          </div>
    </div>
  );
};

export default TopBar;