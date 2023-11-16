import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {BiLeftIndent} from 'react-icons/bi';
import SearchCard from "../components/Cards/SearchcCard";
import getFilter from "../redux/actions/getFilter";
import FilterSortRange from "../components/Filters/FilterSort";
import CategoriesFilter from "../components/Filters/FilterCategories";
import fetchProducts from "../redux/actions/getProducts";
import Pagination from "@mui/material/Pagination";
import Searchbar from "../components/TopBar/SearchBar";
import Productnofound from "../utils/images/BasicIcons/Productnofound.png";
import Loading from "./Loading";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';

const Search = () => {
  const dispatch = useDispatch();
  const productFiltered = useSelector((state) => state.filter);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [marcaSort, setMarcaSort] = useState("")

  //console.log(showFilters, "aveeeer")
  const productsNormales = useSelector((state) => state.products.products);
  const [producWish, setproducWish] = useState([])
  const [producWishFilter, setproducWishFilter] = useState([])
  const wishlist = useSelector((state) => state.wishlist);
  const [valueOrdenamiento, setValueOrdenamiento] = useState("");
  const [showCategories, setShowCategories] = useState(true);
  const [showCategoriesMarca, setShowCategoriesMarca] = useState(true)
  console.log(productFiltered)
  //resultado de toda la busqueda
  const productSearch = useSelector((state)=>state.filterName)
  const [searchMarca, setSearchMarca] = useState("")

  const userA = useSelector((state) =>state.user)
 
  const [sort, setSort] = useState("")
  //console.log(sort, "lissttooooo")


  const category = useSelector((state) => state.category)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("")
  const [newSearch, setNewSearch] = useState([])
  const [searchGlobal, setSearchGlobal] = useState([])
  const [input, setInput] = useState("");
  //console.log(input, "vamooooos")

  const [isLoading, setIsLoading] = useState(true);

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  //setea el estado showFilters de true a false o de false a true 
  const toFilter = () => {
    setShowFilters(!showFilters);
    
  };

  //CODIGO NUEVO
  const finallaDos = (id) =>{
    

  
    const ojala = producWishFilter.some((p) => p.id === id)
    if (ojala === false){

      return false
    }else if(ojala === true){

      return true
    }
  }

  const finalla = (id) =>{
    const ojala = producWish.some((p) => p.id === id)
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
        }
      }
    }
  
    return setproducWishFilter(updatedArray)
  }

  const funcion = () =>{

    const updatedArray = [];
    for (const obj1 of productsNormales) {
      for (const obj2 of wishlist) {
        if (obj1.id === obj2.id) {
          updatedArray.push(obj1);
        }
      }
    }

    return setproducWishFilter(updatedArray)
  }

  const setCurrentSearch = () =>{
    setCurrentPage(1);
  }

  const setCurrentCategory = () =>{
    setCurrentPage(1);
  }

  const handlerAllCategories = () =>{
    setSort("AllCategories")
  }

  const handlerCategoriesSort = () =>{
    setSort("Sort")
  }

  const newSearchBar = (value, category) =>{
    
    setValueOrdenamiento(value)
    if(value.length === 0){
      setInput("Vacio")
      setSearchMarca("")
    }
    if(value.length > 0){
      setInput("Lleno")
      setSearchMarca("Marca")
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
      imageCloudinary: p.imageCloudinary,
    }))

    const productName = minMayusculaProduct.filter(objeto => 
      objeto.name.toLowerCase().includes(value.toLowerCase()))

      if (productName.length===0) {
        return setError("Product no found");
      }
      setError("")
      return setNewSearch(productName);
  }

  const handlerMarca = (valor) =>{
    setMarcaSort(valor)
  }

  const elminiarHandlerMarca = () =>{
    handlerMarca("")
  }

  /////
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      await dispatch(fetchProducts());
      await dispatch(getFilter());
      funcionFilter();
      funcion();

      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);


  useEffect(() => {
    
    setCurrentPage(1);
  }, [productsNormales]);

  useEffect(() => {
    funcion();
    funcionFilter();
  }, [productFiltered, showFilters]);

  const handlerMarcaCategories = () =>{
    setInput("")
  }

  const handlerSearch = ()=>{
    setShowCategories(false)

  } 
  
  const handlerSearch2 = ()=>{
    setShowCategories(true);
  }

  const productFilterMarca = productFiltered.filterResult.filter(p => p.brand === marcaSort)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productFiltered.filterResult.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemsName = productSearch.filterbyname.slice(indexOfFirstItem, indexOfLastItem);
  const currentNewSearch = newSearch.slice(indexOfFirstItem, indexOfLastItem);
  const currentproductFilterMarca = productFilterMarca.slice(indexOfFirstItem, indexOfLastItem)
  console.log(currentNewSearch,"eliminado search")


  return (
    <div className="h-full pb-8 items-center mx-2 ">
    <div className="h-full pb-32 items-center mx-2 "> 
      <Searchbar handlerSearch2={handlerSearch2} newSearchBar={newSearchBar} funcion={funcion} funcionFilter={funcionFilter} setCurrentSearch={setCurrentSearch} />
      <div className="font-jakarta-sans w-auto  flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
         Category
        </h1>
      </div>
      {showFilters && 
        <FilterSortRange         
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          showCategories={showCategories}
          setSelectedCategory={setSelectedCategory} 
          sort={sort}
          handlerMarca={handlerMarca} 
          handlerSearch2={handlerSearch2}
          handlerMarcaCategories={handlerMarcaCategories}
          setCurrentSearch={setCurrentSearch}
        />
      }
      <div className="w-auto h-auto m-6">
       <CategoriesFilter
        handlerAllCategories={handlerAllCategories}
        handlerCategoriesSort={handlerCategoriesSort}
          handlerSearch={handlerSearch} 
          setCurrentCategory={setCurrentCategory} 
          funcion={funcion} 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory} 
          funcionFilter={funcionFilter}
          elminiarHandlerMarca={elminiarHandlerMarca}
          />
      </div>
      <div className="font-jakarta-sans w-auto flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide  mr-8">
          Products
        </h1>
        <button onClick={toFilter} style={{ marginLeft: 'auto' }}>
          <BiLeftIndent className={`text-black-500 text-[35px] font-semibold${input === "Lleno" ? " hidden" : ""}`} />
        </button>
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide"></h1>
      </div>

      <div className="w-full flex justify-center items-center mt-10 mb-10">
        <div className="w-auto grid grid-cols-2 gap-6 justify-center">
          {isLoading && <Loading />}
          {
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
                 imageCloudinary={product.imageCloudinary}
                 isAvailible={product.isAvailible}
               />
             ))
           ) : error==="Product no found" || currentItems.length === 0 ? <div><img className=" h-[240px] w-[240px] top-[340px] absolute left-[84px]" src={Productnofound} alt="Productnofound" /></div> :
          

           productFilterMarca.length > 0 && searchMarca === "" ? 
           currentproductFilterMarca.map((product) => (
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
             imageCloudinary={product.imageCloudinary}
             isAvailible={product.isAvailible}
           />)) :
            
          
          newSearch.length > 0 ? (
          
            currentNewSearch.map((product) => (
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
              imageCloudinary={product.imageCloudinary}
              isAvailible={product.isAvailible}
            />))
          ):

          productFilterMarca.length > 0 ? 
            currentproductFilterMarca.map((product) => (
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
              imageCloudinary={product.imageCloudinary}
              isAvailible={product.isAvailible}
            />)) :

          Array.isArray(currentItems) ? (
            currentItems?.map((product) => (
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
                imageCloudinary={product.imageCloudinary}
                isAvailible={product.isAvailible}
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
  <div className={`mt-2 flex justify-center items-center relative
  ${showCategories === false ? "" : error === "Product no found" ? " hidden" : ""}`}>
  <Pagination
    count={showCategories===false || input === "Vacio" ? Math.ceil(productFiltered.filterResult.length / itemsPerPage) : productFilterMarca.length > 0 && searchMarca === "" ? Math.ceil(productFilterMarca.length/itemsPerPage) : newSearch.length> 0 ? Math.ceil(newSearch.length/itemsPerPage) 
    : productFilterMarca.length > 0 ? Math.ceil(productFilterMarca.length/itemsPerPage) : Math.ceil(productFiltered.filterResult.length / itemsPerPage)}
    page={currentPage}
    onChange={(event, page) => setCurrentPage(page)}
    size="large"
    classes={{ ul: "flex gap-2" }}
    style={{ justifyContent: 'center', padding: '1px', marginLeft: '-23px' }}
    sx={{
      "& .Mui-selected": {
        backgroundColor: "#DAE2DA",
        fontSize: "20px",
      },
      "& .MuiPaginationItem-root": {
        fontSize: "17px",
        marginRight: "-11px",
      },
    }}
  />
</div>
    </div>
  </div>
  );
};


export default Search;

