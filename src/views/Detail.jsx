import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import  fetchProductById  from '../redux/actions/fetchProductById';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { clearDetail } from "../redux/slices/detailSlice";
import backIcon from "../utils/images/BasicIcons/backIcon.png"
import { addToCart } from '../redux/slices/cartSlice';
import toast, { Toaster } from "react-hot-toast";
import Loading from './Loading';
import Slider from "../components/Cards/Home/SliderDetail"

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Detail = () => {
  
  
  const product = useSelector((state) => state.detail.detail);
  const [isLoading, setIsLoading] = useState(true);
  const [cloudinaryData, setCloudinaryData] = useState();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      imageCloudinary: product.imageCloudinary,
      description: product.description,
    };
    toast.success("Added to cart successfully ");
  
    dispatch(addToCart(productData));
  };
  const productDetail = useSelector(state => state.detail.detail);
  const promedioEstrella= Math.floor(productDetail.averageRating)
  

  const imageUrl = productDetail && productDetail.image && productDetail.image.url;



  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true); 
    dispatch(fetchProductById(id))
    setIsLoading(false);
    return ()=>{
      dispatch(clearDetail())
    }
  }, []);

  useEffect(() => {
    setIsLoading(true); 
    if (productDetail.imageCloudinary) {
      setCloudinaryData(productDetail.imageCloudinary);
    }
    setIsLoading(false); 
  }, [productDetail]);

  const cloudinary = productDetail && productDetail.imageCloudinary

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
            <div className="mb-32 bg-blue border border-blue-200 rounded-lg shadow light:bg-gray-800 light:border-gray-700">
        <a href="#">
        <button className="header flex flex-row gap-5 w-full pl-4 pb-3  md:pl-15 lg:pl-20">
          <img
            src={backIcon}
            alt="Arrow"
            className="w-[24px] h-[24px]"
            onClick={goBackHandler}
            />
          <p className="font-general-sans"></p>
            {isLoading && <Loading />}
        </button>
            {productDetail.image ? <img className="p-3 rounded-t-lg" src={productDetail.image} alt="product image"/> : <Slider cloudinary={productDetail && productDetail.imageCloudinary} />}
            
        </a>
        

        <div className="px-5 pb-5">
        <a href="#">
          
          
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rating</Typography>
        <Rating name="read-only" value={promedioEstrella} readOnly />
      </Box>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{productDetail.name} </h5>
            </a>
               <span class="text-1px font-bold text-gray-900 dark:text-black">{productDetail.description} </span>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-black">{productDetail.price} </span>
                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAddToCart}>Add to cart</a>
                
            </div>
        </div>
    </div>
    
      )}



    </div>
    
  );
};

export default Detail;
