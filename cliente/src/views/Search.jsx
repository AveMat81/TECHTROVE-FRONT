import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {BiLeftIndent} from 'react-icons/bi';
import SearchCard from "../components/Cards/SearchcCard";
import SearchCardName from "../components/Cards/SearchCardName";
import getFilter from "../redux/actions/getFilter";
import FilterSortRange from "../components/Filters/FilterSort";
import CategoriesFilter from "../components/Filters/FilterCategories";
import fetchProducts from "../redux/actions/getProducts";
import Pagination from "@mui/material/Pagination";
import Searchbar from "../components/TopBar/SearchBar";
import Productnofound from "../utils/images/BasicIcons/Productnofound.png";


const Search = () => {
  const dispatch = useDispatch();
  const productFiltered = useSelector((state) => state.filter);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  // console.log(productFiltered.filterResult)

  const productsNormales = useSelector((state) => state.products.products);
  const [producWish, setproducWish] = useState([])
  const [producWishFilter, setproducWishFilter] = useState([])
  const wishlist = useSelector((state) => state.wishlist);
  // console.log("whishlist:")
  // console.log(producWishFilter)
  const [showCategories, setShowCategories] = useState(true);

  //resultado de toda la busqueda
  const productSearch = useSelector((state)=>state.filterName)
  console.log(showCategories);

  //setea el estado showFilters de true a false o de false a true 
  const toFilter = () => {
    setShowFilters(!showFilters);
  };

  //CODIGO NUEVO
  const finallaDos = (id) =>{
    const ojala = producWishFilter.some((p) => p.id === id)
    // const ojala = producWish.map((p) => p.id).includes(id);
    if (ojala === false){
      // console.log("no se muestra")
      return false
    }else if(ojala === true){
      // console.log("ssiiii se muestra")
      return true
    }
  }

  const finalla = (id) =>{
    const ojala = producWish.some((p) => p.id === id)
    // const ojala = producWish.map((p) => p.id).includes(id);
    if (ojala === false){
      // console.log("no se muestra")
      return false
    }else if(ojala === true){
      // console.log("ssiiii se muestra")
      return true
    }
  }

  const funcionFilter = () =>{
    const updatedArray = [];
    for (const obj1 of productFiltered.filterResult) {
      for (const obj2 of wishlist) {
        if (obj1.id === obj2.id) {
          // console.log("soy la funcion")
          updatedArray.push(obj1);
          // break;
        }
      }
    }
    // console.log("funcion favorito")
    // console.log(updatedArray)
    return setproducWishFilter(updatedArray)
  }

  const funcion = () =>{
    const updatedArray = [];
    for (const obj1 of productsNormales) {
      for (const obj2 of wishlist) {
        if (obj1.id === obj2.id) {
          // console.log("soy la funcion NORMAL")
          updatedArray.push(obj1);
          // break;
        }
      }
    }
    // console.log("funcion favorito")
    // console.log(updatedArray)
    return setproducWishFilter(updatedArray)
  }


  /////
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
      await dispatch(getFilter());
      funcionFilter();
      funcion();
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [productSearch.filterbyname]);

  useEffect(() => {
    setCurrentPage(1);
  }, [productSearch.filterbyname]);

  useEffect(() => {
    funcion();
    funcionFilter();
    setCurrentPage(1);
  }, [productFiltered, showFilters]);


  const handlerSearch = ()=>{
    setShowCategories(false)
  } 

  const handlerSearch2 = ()=>{
    setShowCategories(true)
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productFiltered.filterResult.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemsName = productSearch.filterbyname.slice(indexOfFirstItem, indexOfLastItem);

  // console.log(currentItems) 




  return (
    <div>
    <div className="h-full pb-32 items-center mx-2 "> 
      <Searchbar handlerSearch2={handlerSearch2}/>


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
       <CategoriesFilter handlerSearch={handlerSearch}/>
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
          {
          productSearch.filterbyname==="Product no found"? <div><img className=" h-[240px] w-[240px] top-[340px] absolute left-[84px]" src={Productnofound} alt="Productnofound" /></div> 
          // && setCurrentPage(1)
          :  showCategories===false?
           (
            currentItems.map((product) => (
              <SearchCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                smallCard={true}
              />
            ))
          ) : 
          productSearch.filterbyname.length>0 ?(
            
          
          currentItemsName.length > 0 ? (
          
            currentItemsName.map((product) => (
              <SearchCardName
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                smallCard={true} />))
          )
          : (<div>No se encontraron productos</div>) ) :

          Array.isArray(currentItems) ? (
            currentItems?.map((product) => (
              <SearchCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image.url ? product.image.url : product.image}
                description={product.description}
                smallCard={true}
                product={product}
                
                favoriteDos={finalla(product.id)}
                favorite={finallaDos(product.id)}
                favoriteNumFilter={product.favoriteFilter} 
                favoriteDesFilter={product.favoriteFilterDesactivado}
              />
            ))
          ) :(
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
    <div className={`mt-2 flex flex-col justify-center items-center relative
     ${productSearch.filterbyname==="Product no found" ? " hidden" : ""}`}>
    <Pagination 
       count={showCategories===false ? Math.ceil(productFiltered.filterResult.length / itemsPerPage) : productSearch.filterbyname.length> 0 ? Math.ceil(productSearch.filterbyname.length/itemsPerPage) 
       : Math.ceil(productFiltered.filterResult.length / itemsPerPage)}
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

