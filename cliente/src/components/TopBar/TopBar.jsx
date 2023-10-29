import React, { useState } from "react";

import ActiveHeartImage from "../../utils/images/Logo/TECHTROVE.png";
// import Banner from "./Banner";
import Searchbar from "./SearchBar";
import Sidebar from "./SideBar";


const TopBar = () => {
  // con este estado cuando se expanda el search se oculta todo
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  //manejo el cambio de enfoque de la barra de búsqueda
  const handleSearchFocus = (focused) => {
    setIsSearchFocused(focused);
  };


  return (
    <div> 
      {/* <Banner />  */}
        <div className="w-full h-auto flex items-center justify-between">
        {!isSearchFocused && <Sidebar/>}
        {!isSearchFocused && (
            <img
            src={ActiveHeartImage}
            alt="Active Heart"
            className="h-8 w-auto lg:hidden mr-4"
            />
        )}
        <div className="lg:flex items-center"></div>
        <Searchbar onFocusChange={handleSearchFocus} />
      
        </div>
    
    </div>
  );
};

export default TopBar;