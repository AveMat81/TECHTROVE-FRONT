import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuSettings2 } from "react-icons/lu";
import getFilter from "../../redux/actions/getFilter";
import { setCategory } from "../../redux/slices/categorySlice";
import Loading from "../../views/Loading";

const FilterCombined = ({ showSortFilters   }) => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showRangeFilters, setShowRangeFilters] = useState(false);

  const handleShowRangeFilters = () => {
    setShowRangeFilters(!showRangeFilters); // Alternar el estado entre true y false
  };

  const handleSelection = async (category) => {
    setIsLoading(true);
    setSelectCategory(category);
    try {
      await dispatch(setCategory({ category: category }));
      await dispatch(getFilter({ category: category, min: minPrice, max: maxPrice, order: sortOrder }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error en la acción:", error);
      setIsLoading(false);
    }
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const applyFilter = () => {
    dispatch(getFilter({ category: categoryState.category, min: minPrice, max: maxPrice, order: sortOrder }));
  };

  return (
    <div >


      {/* FilterSortRange component */}
      {showSortFilters && (
      <div className="filterConatiner flex flex-col h-[420px] max-w-[400px] items-center justify-center gap-[35px] pl-0 pr-[8px] pt-[13px] pb-[15px] relative rounded-md ">
    
        <div className="filterConatiner flex flex-col h-[420px] max-w-[400px] items-center justify-center gap-[35px] pl-0 pr-[8px] pt-[13px] pb-[15px] relative rounded-md ">
      <div className="titleContainer flex w-[297px] items-center gap-[35px] relative flex-[0_0_auto]">
        <div className="relative flex-1 mt-[-1.00px] font-bold text-black text-[24px] tracking-[0.20px] leading-[36px]">
          Filter
        </div>
        <div className="relative w-[24px] h-[24px]" />
      </div>
      <div className="buttonsContainer inline-flex flex-col items-start gap-[10px] rotate-[-0.44deg] relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] font-normal text-black text-[16px] tracking-[0.20px] leading-[20px] whitespace-nowrap">
          Sort By
        </div>
        <div className="inline-flex flex-col items-start gap-[32px] relative flex-[0_0_auto]">
          <div className="inline-flex items-start gap-[12px] relative flex-[0_0_auto] ">
            <button
              onClick={() => handleSortOrderChange("A-Z")}
              className="border-colors-grey-dark-1 h-[39px] border border-solid px-[15px] py-[20px]  inline-flex  w-[unset] mt-[-11.50px] text-[14px] mb-[-9.50px] font-normal rounded-md items-center justify-center focus:bg-[#e54660]"
            >
              A-Z
            </button>
            <button
              onClick={() => handleSortOrderChange("Z-A")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-[#e54660]"
            >
              Z-A
            </button>
            <button
              onClick={() => handleSortOrderChange("Newest")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-[#e54660]"
            >
              Newest
            </button>
            <button
              onClick={() => handleSortOrderChange("Oldest")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-[#e54660]"
            >
              Oldest
            </button>
          </div>
          <div className="inline-flex items-start gap-[12px] relative flex-[0_0_auto]">
            <button
              onClick={() => handleSortOrderChange("price-high")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-[#e54660]"
            >
              High Price
            </button>
            <button
              onClick={() => handleSortOrderChange("price-low")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-[#e54660]"
            >
              Low Price
            </button>
            <button
              onClick={() => handleSortOrderChange("rating")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-[#e54660]"
            >
              Rating
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[297px] items-start gap-[10px] relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] font-normal text-black text-[16px] tracking-[0.20px] leading-[20px] whitespace-nowrap">
          Price Range
        </div>
        <div className="priceContainer flex w-[297px] items-start gap-[17px] relative flex-[0_0_auto]">
          <input
            className="flex-1 flex-grow-0 flex w-[140px] flex-shrink-0 border border-solid px-[10px] py-[10px] rounded-md"
            type="text"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            className="flex-1 flex-grow-0 w-[140px] flex-shrink-0 border border-solid px-[15px] py-[10px] rounded-md"
            type="text"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
      <button
        onClick={applyFilter}
        className="flex w-[273px] h-[50px] px-[10px] py-[20px] flex-col items-center justify-center gap-[10px] relative bg-[#e54660] rounded-[10px]"
      >
        <div className="mt-[-6.00px] mb-[-4.00px] font-bold text-[16px] relative w-fit text-white tracking-[0.20px] leading-[20px] whitespace-nowrap">
          Apply Filter
        </div>
      </button>
    </div>
      </div>
      )}

      <button onClick={handleShowRangeFilters}>
        <LuSettings2 className="text-black-500 text-[30px] font-semibold" />
      </button>

//......................................................................................................
      {/* CategoriesFilter component */}
      <div className="w-auto ">
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleSelection("Monitors")}
            className={`w-[76px] h-[60px] rounded-xl border border-violet-200 flex flex-col justify-center items-center ${
              selectCategory === "Monitors" ? "bg-gray-200" : ""
            }`}
          >
            <img
              src="https://i.postimg.cc/xjXTwHc6/monitor-9678589-7924228.png"
              className="w-[30px] h-[30px]"
            />
            <div className="font-jakarta-sans font-semibold text-stone-900 text-[10px]">
              Monitors
            </div>
          </button>
          <button
            onClick={() => handleSelection("Headsets")}
            className={`w-[76px] h-[60px] rounded-xl border border-violet-200 flex flex-col justify-center items-center ${
              selectCategory === "Headsets" ? "bg-gray-200" : ""
            }`}
          >
            <img
              src="https://i.postimg.cc/xdsn7TYr/gaming-headset-7480997-6138641.png"
              className="w-[30px] h-[30px]"
            />
            <div className="font-jakarta-sans font-semibold text-stone-900 text-[10px]">
              Headsets
            </div>
          </button>
          <button
            onClick={() => handleSelection("Keyboards")}
            className={`w-[76px] h-[60px] rounded-xl border border-violet-200 flex flex-col justify-center items-center ${
              selectCategory === "Keyboards" ? "bg-gray-200" : ""
            }`}
          >
            <img
              src="https://i.postimg.cc/DysfZTQs/keyboard-gaming-6013628-4979944.png"
              className="w-[30px] h-[30px]"
            />
            <div className="font-jakarta-sans font-semibold text-stone-900 text-[10px]">
              Keyboards
            </div>
          </button>
          <button
            onClick={() => handleSelection("Mice")}
            className={`w-[76px] h-[60px] rounded-xl border border-violet-200 flex flex-col justify-center items-center ${
              selectCategory === "Mice" ? "bg-gray-200" : ""
            }`}
          >
            <img
              src="https://i.postimg.cc/1Rb5stFs/gaming-mouse-5756086-4818641.png"
              className="w-[30px] h-[30px]"
            />
            <div className="font-jakarta-sans font-semibold text-stone-900 text-[10px]">
              Mice
            </div>
          </button>
          </div>
          <div className="mt-4" />

          
          <div className="flex flex-wrap justify-center">
          <button
            onClick={() => handleSelection("Mousepads")}
            className={`w-[76px] h-[60px] rounded-xl border border-violet-200 flex flex-col justify-center items-center ${
              selectCategory === "Mousepads" ? "bg-gray-200" : ""
            }`}
          >

            <img
              src="https://i.postimg.cc/cHHDyF8k/Mousepads.png"
              className="w-[30px] h-[30px]"
            />
            <div className="font-jakarta-sans font-semibold text-stone-900 text-[10px]">
              MousePads
            </div>
          </button>
          <button
            onClick={() => handleSelection("Controllers")}
            className={`w-[76px] h-[60px] rounded-xl border border-violet-200 flex flex-col justify-center items-center ${
              selectCategory === "Controllers" ? "bg-gray-200" : ""
            }`}
          >
            <img
              src="https://i.postimg.cc/Xqzjn1J2/Controllers.png"
              className="w-[30px] h-[30px]"
            />
            <div className="font-jakarta-sans font-semibold text-stone-900 text-[10px]">
              Controllers
            </div>
          </button>
          <button
            onClick={() => handleSelection("Earbuds")}
            className={`w-[76px] h-[60px] rounded-xl border border-violet-200 flex flex-col justify-center items-center ${
              selectCategory === "Earbuds" ? "bg-gray-200" : ""
            }`}
          >
            <img
              src="https://i.postimg.cc/L4YLZck6/Earbuds.png"
              className="w-[30px] h-[30px]"
            />
            <div className="font-jakarta-sans font-semibold text-stone-900 text-[10px]">
              Earbuds
            </div>
          </button>
          <button
            onClick={() => handleSelection("Microphones")}
            className={`w-[76px] h-[60px] rounded-xl border border-violet-200 flex flex-col justify-center items-center ${
              selectCategory === "Microphones" ? "bg-gray-200" : ""
            }`}
          >
            <img
              src="https://i.postimg.cc/3xKk9VGG/Microphones.png"
              className="w-[30px] h-[30px]"
            />
            <div className="font-jakarta-sans font-semibold text-stone-900 text-[10px]">
              Microphones
            </div>
          </button>
        </div>  
        </div>
        {isLoading && <Loading />} 
    </div>
  );
};

export default FilterCombined;
