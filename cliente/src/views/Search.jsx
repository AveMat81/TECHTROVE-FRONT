import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {BiLeftIndent} from 'react-icons/bi';
import SearchCard from "../components/Cards/SearchcCard";
import SearchCardName from "../components/Cards/SearchCardName";
import getFilter from "../redux/actions/getFilter";
import fetchProducts from "../redux/actions/getProducts";

import FilterSortRange from "../components/Filters/FilterSort";
import CategoriesFilter from "../components/Filters/FilterCategories";

import Pagination from "@mui/material/Pagination";
import Searchbar from "../components/TopBar/SearchBar";
import Productnofound from "../utils/images/BasicIcons/Productnofound.png";


const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

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
  // console.log(showCategories);
  // console.log(productSearch)

  // const category = useSelector((state) => state.category)

  const [error, setError] = useState("")
  const [newSearch, setNewSearch] = useState([])
  const [searchGlobal, setSearchGlobal] = useState([])
  const [input, setInput] = useState("");
  //console.log(input)

  //console.log("categorias: ", )
  //setea el estado showFilters de true a false o de false a true 
  const toFilter = () => {
    setShowFilters(!showFilters);
  };

  //CODIGO NUEVO
  const finallaDos = (id) =>{
    const ojala = producWishFilter.some((p) => p.id === id)
    // const ojala = producWish.map((p) => p.id).includes(id);
    if (ojala === false){

      return false
    }else if(ojala === true){

      return true
    }
  }

  const finalla = (id) =>{
    const ojala = producWish.some((p) => p.id === id)
    // const ojala = producWish.map((p) => p.id).includes(id);
    if (ojala === false){
      
      return false
    }else if(ojala === true){

      return true
    }
  }

  const funcionFilter = () =>{
    const updatedArray = [];
    for (const obj1 of productFiltered.filterResult) {
      for (const obj2 of wishlist) {
        if (obj1.id === obj2.id) {
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
          updatedArray.push(obj1);
          // break;
        }
      }
    }
    // console.log("funcion favorito")
    // console.log(updatedArray)
    return setproducWishFilter(updatedArray)
  }

  ///FUNCION SEARCHBAR///////
  //console.log(error)
  //console.log(searchGlobal)

  // const restFilter = () =>{
  //   if(input === "Vacio"){
  //     // return dispatch(getFilter());
  //   }
  // }



  const setCurrentSearch = () =>{
    setCurrentPage(1);
  }

  const setCurrentCategory = () =>{
    setCurrentPage(1);
  }

  //console.log("products normales:", productsNormales)

  const newSearchBar = (value, category) =>{
    //console.log(value.length)
    // setInput(value);

    if(value.length === 0){
          //dispatch(getFilter({ category: category }));
 
    

      setInput("Vacio")
    }
    if(value.length > 0){
      setInput("Lleno")
    }


    const minMayusculaProduct = productsNormales.map(p =>({
      id: p.id,
      name: p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      category: p.category,
      color: p.color,
      description: p.description,
      image: p.image,
      isAvailible: p.isAvailible,
      price: p.price,
      stock: p.stock,
      rating: p.rating,
      averageRating: p.averageRating,
      discount: p.discount,
      favoriteFilter: p.favorite,
      favoriteFilterDesactivado: p.favoriteDesactivado,
      filtrosProps: 1,
    }))

    const productName = minMayusculaProduct.filter(objeto => 
      objeto.name.toLowerCase().includes(value.toLowerCase()))

      if (productName.length===0) {
        //console.log("algoooo");
        return setError("Product no found");
      }
      setError("")
      //console.log(productName)
      return setNewSearch(productName);
  }


  /////
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
      await dispatch(getFilter());
      // restFilter()
      funcionFilter();
      funcion();
    };
    fetchData();
  }, [dispatch]);

  // useEffect(() => {
    
  //   setCurrentPage(1);
  // }, [productSearch.filterbyname]);

 

  useEffect(() => {
    
    setCurrentPage(1);
  }, [productsNormales]);

  useEffect(() => {
    funcion();
    funcionFilter();
    //setCurrentPage(1);
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
  const currentNewSearch = newSearch.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div>
    <div className="h-full pb-32 items-center mx-2 "> 
      <Searchbar handlerSearch2={handlerSearch2} newSearchBar={newSearchBar} funcion={funcion} funcionFilter={funcionFilter} setCurrentSearch={setCurrentSearch} />


      <div className="font-jakarta-sans w-auto  flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
         {category || "Category"}
        </h1>
      </div>
      {showFilters && 
        <FilterSortRange         
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      }
      <div className="w-auto h-auto m-6">
       <CategoriesFilter handlerSearch={handlerSearch} setCurrentCategory={setCurrentCategory} funcion={funcion} funcionFilter={funcionFilter}/>
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
            // error==="Product no found"? <div><img className=" h-[240px] w-[240px] top-[340px] absolute left-[84px]" src={Productnofound} alt="Productnofound" /></div> :
          // // && setCurrentPage(1)
          showCategories===false || input === "Vacio" ?
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

                 product={product}
                 favoriteDos={finalla(product.id)}
                 favorite={finallaDos(product.id)}
                 favoriteNumFilter={product.favoriteFilter} 
                 favoriteDesFilter={product.favoriteFilterDesactivado}
               />
             ))
           ) : error==="Product no found"? <div><img className=" h-[240px] w-[240px] top-[340px] absolute left-[84px]" src={Productnofound} alt="Productnofound" /></div> :
          // productSearch.filterbyname.length>0 ?(
            
          
          newSearch.length > 0 ? (
          
            currentNewSearch.map((product) => (
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
            />))
          ):



          // : (<div>No se encontraron productos</div>) ) :

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
     ${showCategories===false ? "" : error==="Product no found" ? " hidden" : ""}`}>
    <Pagination 
       count={showCategories===false ? Math.ceil(productFiltered.filterResult.length / itemsPerPage) : newSearch.length> 0 ? Math.ceil(newSearch.length/itemsPerPage) 
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

