import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  fetchProductById  from '../redux/actions/fetchProductById';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { clearDetail } from "../redux/slices/detailSlice";
import backIcon from "../utils/images/BasicIcons/backIcon.png"

const Detail = () => {

  const productDetail = useSelector(state => state.detail.detail);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductById(id))
    return ()=>{
      dispatch(clearDetail())
    }
  }, [dispatch, id]);

  const goBackHandler = () => {
    navigate(-1);
  };


  return (
    <div className="container mx-auto mt-4 p-4 rounded-lg shadow light:bg-white-800 light:border-white-700">
      {productDetail.loading ? (
        <p className="text-center text-2xl font-semibold">Loading...</p>
      ) : productDetail.error ? (
        <p className="text-center text-2xl font-semibold text-red-500 font-color:black ">Error: {productDetail.error}</p>
      ) : (
        <div class="w-full max-w-sm bg-blue border border-blue-200 rounded-lg shadow light:bg-gray-800 light:border-gray-700">
        <a href="#">
        <button className="header flex  flex-row gap-5 w-full pl-4 pb-3  md:pl-15 lg:pl-20">
          <img
            src={backIcon}
            alt="Arrow"
            className="w-[24px] h-[24px]"
            onClick={goBackHandler}
          />
        </button>
            <img class="p-3 rounded-t-lg" src={productDetail.image} alt="product image" />
        </a>
        <div class="px-5 pb-5">
          <FavoriteIcon ></FavoriteIcon>
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{productDetail.name} </h5>
            </a>
                   
            <div class="flex items-center mt-2.5 mb-5">
              
                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>

                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
               </div>
               <span class="text-1px font-bold text-gray-900 dark:text-black">{productDetail.description} </span>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-black">{productDetail.price} </span>
                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                
            </div>
        </div>
    </div>
    
      )}



    </div>
    
  );
};

export default Detail;
