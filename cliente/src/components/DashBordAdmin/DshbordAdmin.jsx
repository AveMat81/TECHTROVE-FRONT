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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsNormales.slice(indexOfFirstItem, indexOfLastItem);
  const currentNewSearch = newSearch.slice(indexOfFirstItem, indexOfLastItem);
  console.log(productsNormales, "aososossososo")

  const newSearchBar = (e) =>{
    const value = e.target.value
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
          {/* <select className="w-2/5 p-2 rounded border border-gray-300">
          <option value="" disabled selected>Category</option>
            <option value="opcion1">Opción </option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select> */}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap -m-2">
          <div className="">
            <div className="bg-white rounded-lg w-auto h-auto grid grid-cols-2 gap-4">
              {input === "Vacio" ? 
              currentItems.map((product, i) => (<DashborAdminCard key={i} name={product.name} price={product.price} image={product.image} id={product.id} isAvailible={product.isAvailible} imageCloudinary={product.imageCloudinary} />))
              : error==="Product no found" ? <div>Not found </div> : 
              newSearch.length > 0 ? 
                currentNewSearch.map((product, i) => (<DashborAdminCard key={i} name={product.name} price={product.price} image={product.image} id={product.id} isAvailible={product.isAvailible} imageCloudinary={product.imageCloudinary}/>))
              : currentItems.map((product, i) => (<DashborAdminCard key={i} name={product.name} price={product.price} image={product.image} id={product.id} isAvailible={product.isAvailible} imageCloudinary={product.imageCloudinary}/>))
              }
              
            </div>
          </div>
        </div>
      </div>



      <div className={`mt-8 flex flex-col justify-center items-center relative${error==="Product no found" ? " hidden" : ""}`}>
    <Pagination 
       count={newSearch.length> 0 ? Math.ceil(newSearch.length/itemsPerPage) : Math.ceil(productsNormales.length / itemsPerPage)}
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
    
  )
}

export default DshbordAdmin