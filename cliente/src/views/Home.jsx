import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeCard from "../components/Cards/HomeCard"
import fetchProducts from "../redux/actions/getProducts";
import getFilter from '../redux/actions/getFilter';
import { Link } from "react-router-dom";
import Slider from "../components/Cards/Home/Slider"

function Home() {
 
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); 
  const productsNormales = useSelector((state) => state.products.products);
  let products = useSelector((state) => state.products.products);

  let productFiltered = useSelector((state) => state.filter);
  products = products.slice(0, 4);

  let filtradolo = productFiltered.filterResult ? productFiltered.filterResult.slice(0, 4) : [];


  const [producWish, setproducWish] = useState([])
  const [producWishFilter, setproducWishFilter] = useState([])

  console.log("wishlist HOME")
  console.log(producWishFilter)

  const favoritolo = useSelector((state) => state.favorite)


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

  const funcion = () =>{
    const updatedArray = [];
    for (const obj1 of products) {
      for (const obj2 of wishlist) {
        if (obj1.id === obj2.id) {
          updatedArray.push(obj1);
        }
      }
    }
    return setproducWish(updatedArray)
  }

  const funcionFilter = () =>{
    const updatedArray = [];
    for (const obj1 of productFiltered.filterResult) {
      for (const obj2 of wishlist) {
        if (obj1.id === obj2.id) {
          console.log("soy la funcion DE HOME filteereeeeer")
          updatedArray.push(obj1);
        }
      }
    }
    return setproducWishFilter(updatedArray)
  }

  const funcionFilterTercero = () =>{
    const updatedArray = [];
    for (const obj1 of productsNormales) {
      for (const obj2 of wishlist) {
        if (obj1.id === obj2.id) {
          console.log("soy la funcion TERCEEEEEERAAAA")
          updatedArray.push(obj1);
        }
      }
    }
    return setproducWishFilter(updatedArray)
  }

  
  useEffect(() => {
  
    const fetchData = async () => {
      await dispatch(fetchProducts());
      await dispatch(getFilter({ min: '70' , max: '100'}));
      setIsLoading(false); 
      funcion();
      funcionFilter();
      funcionFilterTercero();
    };

    fetchData();
  }, [dispatch]);


    return (
      <>
      <div className="h-full pb-32 pl-4 pr-4">

      <div className="h-auto mx-2 mt-10 w-auto">
        <Slider />
      </div>
      <div className="font-jakarta-sans w-auto flex justify-between items-center mt-10 my-6">
      <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
        Most Popular
      </h1>
      </div>
      <div className="w-auto h-auto grid grid-cols-2 gap-4 ">
          {filtradolo.map((product, i) => (
            <HomeCard key={i} image={product.image} id={product.id} price={product.price} name={product.name} product={product} favorite={finallaDos(product.id)} funcion={funcion} finalla={finalla} favoriteNumFilter={product.favoriteFilter} favoriteDesFilter={product.favoriteFilterDesactivado} filtrosProps={product.filtrosProps} />
            ))}
      </div>
      <div className="font-jakarta-sans w-auto flex justify-between items-center mt-10 mr-4 my-6">
      <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
        On Sale
      </h1>
      <Link to="/Search">
        <p className="text-violet-900 text-[14px] font-semibold">SEE ALL</p>
      </Link>
      </div>
      <div className="w-auto h-auto grid grid-cols-2 gap-4 ">
          {
            products.map((product, i) => (
            <HomeCard key={i} image={product.image} id={product.id} price={product.price} name={product.name} category={product.category} product={product} favorite={finalla(product.id)} funcion={funcion} finalla={finalla} favoriteNum={product.favorite} favoriteDes={product.favoriteDesactivado} />
            ))}
      </div>

      </div>       
      </>
    )

  
  }
  
export default Home;