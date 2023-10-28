import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LuSettings2 } from "react-icons/lu";
import SearchCard from "../components/Cards/SearchcCard";


const Search = () => {
    
  const productFiltered = useSelector((state) => state.filter);
console.log("productFiltered",productFiltered);
  return (
    <div className="h-full pb-32">
      <div className="font-jakarta-sans w-auto flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
         Category
        </h1>
        <button >
          <LuSettings2 className="text-black-500 text-[30px] font-semibold" />
        </button>
      </div>
      <div className="w-auto h-auto m-6">
        <h1>categories</h1>
      </div>
      <div className="font-jakarta-sans w-auto flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
          Products
        </h1>
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
        </h1>

      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-auto h-0 grid grid-cols-1 gap-1 justify-center mx-3 border font-bold">
          {Array.isArray(productFiltered.filterResult.results) ? (
            productFiltered.filterResult.results.map((product) => (
              <SearchCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image_url}
                description={product.description}
                smallCard={true}
                toggleWishlist={toggleWishlist}
              />
            ))
          ) : (
            <>
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default Search;
