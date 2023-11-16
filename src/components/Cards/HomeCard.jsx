

import {Link} from "react-router-dom"
import imagePaths from "../AppBar/imagePaths";
import toast, { Toaster } from "react-hot-toast";
import { addToCart } from "../../redux/slices/cartSlice";
import React from "react";
import { useState } from "react";
import {
  addToWishlist,removeFromWishlist
} from "../../redux/slices/WishlistSlice";
import {favoriteActivo, favoriteDesactivo, noFavoriteActivo, noFavoriteDesactivo} from "../../redux/slices/productsSlice"
import {favoriteFilterActivo, favoriteFilterDesactivo, noFavoriteFilterActivo, noFavoriteFilterDesactivo} from "../../redux/slices/filterSlice"
import {activeIcon, iconDesactive} from "../../redux/slices/favoriteIcono"
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';
const HomeCard = ({ image,id, name, price, product, favorite, funcion, finalla, favoriteNum, favoriteDes, filtrosProps, favoriteNumFilter, favoriteDesFilter, isAvailible  }) => {
  console.log(isAvailible, "eliminado hommeeee")
  const wishlist = useSelector((state) => state.wishlist);
  const favoritoo = useSelector((state) => state.favorite)
  const dispatch = useDispatch();

  const [favorito, setFavorito] = useState(0)
  const [addedProducts, setAddedProducts] = useState([]);

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image }));
    toast.success("Added to cart successfully ");
  };
  
  

  
  

  const getFavoriteIcon = () => {
    if(favoriteNumFilter === 1) {
      return imagePaths.Favorite.active;
    }
    if(favoriteDesFilter === 1){
      return imagePaths.Favorite.inactive;
    }
    ////////
    if(favoriteNum === 1) {
      return imagePaths.Favorite.active;
    }
    if(favoriteDes === 1){
      return imagePaths.Favorite.inactive;
    }
    if (favorite === false) {
      return imagePaths.Favorite.inactive;
    } 
    else {
      return imagePaths.Favorite.active;
    }
  };

  // const loginAlert = () => {
    
    const favoriteDefinitivo = (e) =>{
      if (!isAuthenticated){
        Swal.fire({
          title: 'Error',
          text: 'You need to login first!',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Go to login',
          confirmButtonColor: 'green',
          cancelButtonText: 'Cancel',
          cancelButtonColor: 'red', 
        }).then((result) => {
          if (result.isConfirmed) {
            loginWithRedirect();
          }
        });
      return
    }
    if(filtrosProps !== 1){
      console.log("normal")
      return favorites()
    }
    if(filtrosProps === 1){
      console.log("filter")
      return favoritesFilter()
    }

  }
  
  // console.log(favoritoo)
  const favorites = (e) =>{
    if( favoriteNum === 1 || favoriteDes === 2){
      toast.success("Delete to favorite succesfully");
      dispatch(noFavoriteActivo(id))
      dispatch(favoriteDesactivo(id))
      return dispatch(removeFromWishlist(product));
    }
    if (favoriteDes === 1){
      console.log("normal")
      dispatch(favoriteActivo(id))
      dispatch(noFavoriteDesactivo(id))
      dispatch(addToWishlist(product));
      toast.success("Added to favorite successfully ");
      return setFavorito(1)
    }
    if(favorite === true){
      console.log("normal")
      toast.success("Delete to favorite succesfully");
      dispatch(noFavoriteActivo(id))
      dispatch(favoriteDesactivo(id))
      return dispatch(removeFromWishlist(product));
    }

    dispatch(favoriteActivo(id))
    dispatch(addToWishlist(product));
    toast.success("Added to favorite successfully ");
    return setFavorito(1)
  }
  
  const favoritesFilter = (e) =>{
      if( favoriteNumFilter === 1 || favoriteDesFilter === 2){

        toast.success("Delete to favorite succesfully");
        dispatch(noFavoriteFilterActivo(id))
        dispatch(favoriteFilterDesactivo(id))
        return dispatch(removeFromWishlist(product));
      }
      if (favoriteDesFilter === 1){
        console.log("filter")
        dispatch(favoriteFilterActivo(id))
        dispatch(noFavoriteFilterDesactivo(id))
        dispatch(addToWishlist(product));
        toast.success("Added to favorite successfully ");
        return setFavorito(1)
      }
      if(favorite === true){
        console.log("filter")
        dispatch(noFavoriteFilterActivo(id))
        dispatch(favoriteFilterDesactivo(id))
  
        toast.success("Delete to favorite succesfully");

        return dispatch(removeFromWishlist(product));
      }
      console.log("filter")

      dispatch(favoriteFilterActivo(id))
      dispatch(addToWishlist(product));
      toast.success("Added to favorite successfully ");
      return setFavorito(1)
    
  }

  return (
    <>
    {
      isAvailible === false ? null : 

    <div className="inline-flex flex-col gap-[8px] relative">
        {/* <div className="w-[160px] h-[160px] relative bg-violet-50 rounded-3xl items-start"> */}
        <div className="relative bg-blue-100 rounded-3xl flex justify-center items-center">
          <Link to={`/detail/${id}`}>
          <img
            className="relative w-auto h-auto object-cover"
            alt="Rectangle"
            src={image}
          />
        {/* <button class="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1">Botón</button> */}
        </Link>
        <img onClick={favoriteDefinitivo}
              alt="Home"
              src={
                getFavoriteIcon()
              }
              className="w-8 h-8 opacity-80 absolute top-1 right-1"
              />
        </div>
      

      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="text-left text-stone-900 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal">
        {name}</div>
      </div>

      <div className="w-full justify-around items-center">
        <div className="justify-between flex text-blue-600 text-lg font-semibold font-jakarta-sans leading-[28px] tracking-normal text-[20px]">
        $ {price}
        
        <div className="flex pb-30">
            <img onClick={handleAddToCart}
              alt="Home"
              src={
                imagePaths.Add.inactive
              }
              className="w-8 h-8 opacity-40"
              />
        </div>
        </div>

      </div>

      
    </div>
    }
    </>
  );
};

export default HomeCard;
