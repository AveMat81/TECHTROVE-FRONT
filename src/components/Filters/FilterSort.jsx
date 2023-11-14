import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFilter from "../../redux/actions/getFilter"

export const FilterSortRange = ({ showFilters, setShowFilters, showCategories,setSelectedCategory, sort }) => {
  console.log(showCategories, "dentro de ordenamientooo")
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  console.log(sort, "osisisisisisisisi")
  console.log(showCategories, "sooooooh")
  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };
  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleHideFilters = () => {
    setShowFilters(false);
  };

  const applyFilter = () => {
    if(showCategories === true){
      dispatch(
        getFilter({
          //esto hay que cambiarlo mas adelante
          //category: categoryState.category,
          min: minPrice,
          max: maxPrice,
          order: sortOrder,
        })
      );
    }
    if(showCategories === false && sort === "AllCategories"){
      dispatch(
        getFilter({
          //esto hay que cambiarlo mas adelante
          //category: categoryState.category,
          min: minPrice,
          max: maxPrice,
          order: sortOrder,
        })
      );
    }
    if(showCategories === false && sort === "Sort"){
      dispatch(
        getFilter({
          //esto hay que cambiarlo mas adelante
          category: categoryState.category,
          min: minPrice,
          max: maxPrice,
          order: sortOrder,
        })
      );
    }
  };
  console.log(applyFilter);
  return (

    <div className={`fixed inset-0 z-50 ${showFilters ? "block" : "hidden"}`}>
    
    
    <div className="filterConatiner flex flex-col h-[420px] max-w-[400px] items-center justify-center gap-[35px] pl-0 pr-[8px] pt-[13px] pb-[15px] relative rounded-md ">
    <div className="bg-white p-6 rounded shadow-lg">
      <div className="titleContainer flex w-[297px] items-center gap-[35px] relative flex-[0_0_auto]">
        <div className="relative items-center flex-1 mt-[-1.00px] font-bold text-black text-[24px] tracking-[0.20px] leading-[36px]">
          Filters
        </div>
        <div className="relative w-[24px] h-[24px]" />
      </div>
      <div className="buttonsContainer inline-flex flex-col items-start gap-[10px] rotate-[-0.44deg] relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] font-normal text-black text-[16px] tracking-[0.20px] leading-[20px] whitespace-nowrap">
          Sort By
        </div>
        <div className="mt-4" />

        <div className="inline-flex flex-col items-start gap-[32px] relative flex-[0_0_auto]">
          <div className="inline-flex items-start gap-[12px] relative flex-[0_0_auto] ">
            <button
              onClick={() => handleSortOrderChange("A-Z")}
              className="border-colors-grey-dark-1 h-[39px] border border-solid px-[15px] py-[20px]  inline-flex  w-[unset] mt-[-11.50px] text-[14px] mb-[-9.50px] font-normal rounded-md items-center justify-center focus:bg-blue-500"
            >
              A-Z
            </button>
            <button
              onClick={() => handleSortOrderChange("Z-A")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-blue-500"
            >
              Z-A
            </button>
            <button
              onClick={() => handleSortOrderChange("Newest")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-blue-500"
            >
              Newest
            </button>
            <button
              onClick={() => handleSortOrderChange("Oldest")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-blue-500"
            >
              Oldest
            </button>
          </div>
          <div className="inline-flex items-start gap-[12px] relative flex-[0_0_auto]">
            <button
              onClick={() => handleSortOrderChange("price-high")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-blue-500"
            >
              High Price
            </button>
            <button
              onClick={() => handleSortOrderChange("price-low")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-blue-500"
            >
              Low Price
            </button>
            <button
              onClick={() => handleSortOrderChange("rating")}
              className="border-colors-grey-dark-1 h-[39px] flex-[0_0_auto] border border-solid px-[15px] py-[20px] inline-flex bg-white w-[unset] mt-[-11.50px] text-black text-[14px] mb-[-9.50px] font-normal rounded-md  items-center justify-center focus:bg-blue-500"
            >
              Rating
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[297px] items-start gap-[10px] relative flex-[0_0_auto]">
      <div className="mt-4" />
        <div className="relative w-fit mt-[-1.00px] font-normal text-black text-[16px] tracking-[0.20px] leading-[20px] whitespace-nowrap">
          Price Range ( Ex. 100 - 150 ) 
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
            <div className="mt-4" />

      <button
        className="flex w-[273px] h-[50px] px-[10px] py-[20px] flex-col items-center justify-center gap-[10px] relative bg-blue-500 rounded-[10px]"
      >
        <div  onClick={applyFilter} 
        
        className="mt-[-6.00px] mb-[-4.00px] font-bold text-[16px] relative w-fit text-white tracking-[0.20px] leading-[20px] whitespace-nowrap">
          Apply Filter
        </div>
      </button>
      <div className="mt-4" />

      <div className="flex flex-col w-[297px] items-center  gap-[10px] relative flex-[0_0_auto]">

      <button  onClick={handleHideFilters} className="bg-red-500 text-white px-4 py-2 rounded">
          Close Filter
        </button>
    </div>
    </div>
    </div>
    </div>
  );
};

export default FilterSortRange;
