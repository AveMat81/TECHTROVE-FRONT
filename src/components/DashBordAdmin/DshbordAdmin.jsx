import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import DashborAdminCard from "./DashborAdminCard"
import fetchProducts from "../../redux/actions/getProducts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const DshbordAdmin = () => {
  const dispatch = useDispatch();
  const productsNormales = useSelector((state) => state.products.products);

  useEffect(() => {
  
    const fetchData = async () => {
      await dispatch(fetchProducts());
    };

    fetchData();
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [input, setInput] = useState("");
  const [newSearch, setNewSearch] = useState([])
  const [error, setError] = useState("")
  const [filter, setFilter] = useState([])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsNormales.slice(indexOfFirstItem, indexOfLastItem);
  const currentNewSearch = newSearch.slice(indexOfFirstItem, indexOfLastItem);
  const currentFilter = filter.slice(indexOfFirstItem, indexOfLastItem)
  console.log(productsNormales, "aososossososo")

  const newSearchBar = (e) =>{
    const value = e.target.value
    setFilter([])
    setCurrentPage(1);
    if(value.length === 0){
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
      imageCloudinary: p.imageCloudinary
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

  const categoriasUnicas = [...new Set(productsNormales.map(producto => producto.category))];
  console.log(categoriasUnicas)

  console.log(filter, "fiiiiiiii")
  const handlerCategory = (e) =>{
    console.log(e.target.value)
    if(e.target.value === "Categories"){
      setCurrentPage(1)
      return setFilter([])
    }
    setCurrentPage(1)
    const productsNormalesDos = productsNormales.filter((product) => product.category === e.target.value);
    //console.log(productsNormalesDos, "doooos")
    return setFilter(productsNormalesDos)
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <Link to="/create" >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+ Create new</button>
        </Link>
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <input
            className="w-4/5 p-2 rounded border border-gray-300"
            type="text"
            placeholder="Search"
            onChange={newSearchBar}
          />
          <div className="w-1/5"></div> {/* Espacio entre los elementos */}
          <select onChange={handlerCategory} className={`w-2/5 p-2 rounded border border-gray-300${input === "Lleno" ? " hidden" : ""}`}>
          <option value="" disabled selected>Category</option>
          <option value="Categories" >All Categories</option>
            {categoriasUnicas.map(p => <option value={p}>{p} </option>)}

          </select>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap -m-2">
          <div className="">
            <div className="bg-white rounded-lg w-auto h-auto grid grid-cols-2 gap-4">
              {filter.length > 0 ? currentFilter.map((product, i) => (<DashborAdminCard key={i} name={product.name} price={product.price} image={product.image} id={product.id} isAvailible={product.isAvailible} imageCloudinary={product.imageCloudinary}/>))
              : input === "Vacio" ? 
              currentItems.map((product, i) => (<DashborAdminCard key={i} name={product.name} price={product.price} image={product.image} id={product.id} isAvailible={product.isAvailible} imageCloudinary={product.imageCloudinary} />))
              : error==="Product no found" ? <div>Not found </div> : 
              newSearch.length > 0 ? 
                currentNewSearch.map((product, i) => (<DashborAdminCard key={i} name={product.name} price={product.price} image={product.image} id={product.id} isAvailible={product.isAvailible} imageCloudinary={product.imageCloudinary}/>))
              :  currentItems.map((product, i) => (<DashborAdminCard key={i} name={product.name} price={product.price} image={product.image} id={product.id} isAvailible={product.isAvailible} imageCloudinary={product.imageCloudinary}/>))
              }
              
            </div>
          </div>
        </div>
      </div>



      <div className={`mt-8 flex flex-col justify-center items-center relative${error==="Product no found" ? " hidden" : ""}`}>
    <Pagination 
       count={filter.length > 0 ? Math.ceil(filter.length/itemsPerPage) : newSearch.length> 0 ? Math.ceil(newSearch.length/itemsPerPage) : Math.ceil(productsNormales.length / itemsPerPage)}
       page={currentPage}
       onChange={(event, page) => setCurrentPage(page)}
       size="large"       
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
    
  )
}

export default DshbordAdmin