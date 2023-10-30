import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {BiLeftIndent} from 'react-icons/bi';
import SearchCard from "../components/Cards/SearchcCard";
import getFilter from "../redux/actions/getFilter";
import FilterSortRange from "../components/Filters/FilterSort";
import CategoriesFilter from "../components/Filters/FilterCategories";
import fetchProducts from "../redux/actions/getProducts";
import Pagination from "@mui/material/Pagination";

const Search = () => {
  const dispatch = useDispatch();
  const productFiltered = useSelector((state) => state.filter);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const toFilter = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
      await dispatch(getFilter());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [productFiltered, showFilters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productFiltered.filterResult.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
    <div className="h-full pb-32 items-center mx-2 "> 
      Barra search 
      <div className="font-jakarta-sans w-auto  flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
         Category
        </h1>
      </div>
      {showFilters && 
        <FilterSortRange         
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      }
      <div className="w-auto h-auto m-6">
        <CategoriesFilter />
      </div>
      <div className="font-jakarta-sans w-auto flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide  mr-8">
          Products
        </h1>
        <button onClick={toFilter} style={{ marginLeft: 'auto' }}>
          <BiLeftIndent className="text-black-500 text-[35px] font-semibold" />
        </button>
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide"></h1>
      </div>
      <div className="w-full flex justify-center items-center mt-10 mb-10">
        <div className="w-auto grid grid-cols-2 gap-6 justify-center">
          {Array.isArray(currentItems) ? (
            currentItems?.map((product) => (
              <SearchCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image.url? product.image.url : product.image}
                description={product.description}
                smallCard={true}
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
      {/* Paginado */}
    <div className="mt-2 flex flex-col justify-center items-center relative">
     <Pagination
       count={Math.ceil(productFiltered.filterResult.length / itemsPerPage)}
       page={currentPage}
       onChange={(event, page) => setCurrentPage(page)}
       size="large"       
       sx={{
        "& .Mui-selected": {
         backgroundColor: "#50a050",
         fontSize: "20px",
       },
       "& .MuiPaginationItem-root": {
         fontSize: "15px",
        },
        "& .paginationButton": {
         backgroundColor: "#50a100",
        },
      }}
     />
    </div>
    </div>
  </div>
  );
};

export default Search;

