import React, { useState } from "react";
import { Link } from "react-router-dom";
import Heart from "../../utils/images/AppbarIcons/IconoDelete.gif";

import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/WishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";


const WishlistCard = ({ id, name, image, price, description, isInWishlist, toggleWishlist  }) => {
  
  const dispatch = useDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image }));
    toast.success("Added to cart successfully ");
  };
  

  const removeCard = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist({ id }));
      toast.success("This product has been deleted ");

    } else {
      dispatch(addToWishlist({ id, name, image, price, description }));
    }
  };


  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // const handleAddToCart = () => {
  //   const productData = {
  //     id,
  //     name,
  //     price,
  //     image,
  //     description,
  //   };
  //   toast.success("Added to cart successfully ");

  //   console.log(productData);
  //   dispatch(addToCart(productData));
  // };

  const descriptionText = description.length > 86 ? (
    showFullDescription ? description : `${description.slice(0, 86)} ...`
  ) : description;


  return (
    <div className="bg-red p-3 rounded-lg shadow-lg mb-4 rounded-md md:rounded-lg mx-1 md:mx-0 border border-red max-w-screen-xl">
      <div className="inline-flex flex-col gap-[8px] relative">
        <div className="relative bg-blue-100 rounded-3xl flex justify-center items-center " >
          <img
            src={Heart}
            className={`w-6 h-6 md:w-auto md:h-auto object-cover rounded-lg cursor-pointer ml-4 absolute top-2 right-2 ${
              isInWishlist ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => removeCard(id)}
          />
            <img
              src={image}
              alt={name}
              className="relative w-1/2 h-1/2 object-cover"
              style={{  padding: "4px" }}
            />
          
        </div>
        
        <div className="md:w-2/2 md:pl-2 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-800 text-lg font-semibold text-left" style={{ marginLeft: "22px" }} >{name}</div>
          </div>
          <Link to={`/${id}`} >
          <div className="text-gray-600 text-sm mt-2 text-left mb-4" style={{ fontFamily: "Roboto", marginLeft: "22px" }}>{descriptionText}</div>
          {description.length > 31 && (
            <div className="flex items-center justify-center">
              
          </div>
          )}
          </Link>
          <div className="flex items-center justify-between mt-auto">
          <div className="text-blue-600 text-lg font-semibold" style={{ marginLeft: "22px" }}>$ {price}</div>
          
            <button  onClick={handleAddToCart}
              className="button bg-blue-700 text-white text-lg px-5 py-2 rounded-full ">
              Buy
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
