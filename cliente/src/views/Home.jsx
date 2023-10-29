import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeCard from "../components/Cards/HomeCard"
import fetchProducts from "../redux/actions/getProducts";
import getFilter from '../redux/actions/getFilter';
import { Link } from "react-router-dom";
import Slider from "../components/Cards/Home/Slider"

function Home() {
 
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); 
  let products = useSelector((state) => state.products.products);
  let productFiltered = useSelector((state) => state.filter);
  //products = products.filter((product) => product.category === "Microphones")
  products = products.slice(0, 4);
  console.log(productFiltered)
  let filtradolo = productFiltered.filterResult ? productFiltered.filterResult.slice(0, 4) : [];

  // const productF = products.filter(products.category === "Earbuds")
  // console.log(productF)
  //productF = productF.slice(0, 4);
  //console.log(filtradolo)

  useEffect(() => {
  
    const fetchData = async () => {
      await dispatch(fetchProducts());
      //await dispatch(getFilter({ category: 'Monitors' }));
      //await dispatch(getFilter({ order: 'A-Z' }));
      await dispatch(getFilter({ min: '70' , max: '100'}));
      setIsLoading(false); 
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
            <HomeCard key={i} image={product.image} id={product.id} price={product.price} name={product.name} />
            ))}
      </div>
      <div className="font-jakarta-sans w-auto flex justify-between items-center mt-10 mr-4 my-6">
      <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
        On Sale
      </h1>
      <Link to="/Search">
        <p className="text-red-500 text-[12px] font-semibold border-b border-red-500">SEE ALL</p>
      </Link>
      </div>
      <div className="w-auto h-auto grid grid-cols-2 gap-4 ">
          {
            products.map((product, i) => (
            <HomeCard key={i} image={product.image} id={product.id} price={product.price} name={product.name} category={product.category} />
            ))}
      </div>

      </div>       
      </>
    )

    // return (
    //   <div>holaaa</div>
    // )
  }
  
export default Home;