
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchBrands from '../redux/actions/getBrand';
import { deleteBrand } from '../redux/slices/brandSlice';
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 




const Brand = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands.brands);
 
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleDeleteBrand = async (e) => {
  
    // dispatch(deleteBrand(id));
    await axios.delete(`${VITE_VERCEL_API_URL_BASE}/api/brands/delete/${e}`);
    console.log("id:" + e);

  };

  return (
    
      <div class="container flex flex-col items-center justify-center w-full mx-auto">
    <div class="w-full px-4 py-4 mb-8 bg-white border rounded-md shadow sm:px-6 dark:bg-black">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            BRANDS
        </h3>
    </div>
    <div class="flex flex-col">
        {Array.isArray(brands) ? (
            brands.map((brand) => (
                <div key={brand.id} class="mb-2 border-gray-400">
                    <div class="shadow border select-none cursor-pointer bg-white dark:bg-black rounded-md flex flex-1 items-center  p-7">
                    <div class="flex flex-col items-left justify-left w-10 h-10 mr-20">
                                             <div class="flex-1 ">
                            <div class="font-medium dark:text-white text-left">
                            <ul >
                                    <li>
                                        {brand.name}
                                    </li>
                                </ul>
                            </div> 
                        </div>       </div>
                        <Link to ={`/editBrand/${brand.id}`}><button class="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-purple-400">
  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
</button></Link>

<button onClick={() => handleDeleteBrand(brand.id)} class="inline-flex items-center px-2 py-2 bg-white hover:bg-red-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="black">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>

  </button>
                    </div>
                </div>
            ))
        ) : (
            <div>No hay marcas disponibles.</div>
        )}
    </div>  
    <div>
      <li/>
    <Link to="/createBrand">
    <button  class="inline-flex items-left px-4 py-4 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="black">
	  
	</svg>
CREATE BRAND
  </button>
    </Link>
      
</div>
    </div>
    
 );
};

export default Brand;
