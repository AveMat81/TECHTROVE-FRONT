import {Link} from "react-router-dom"
import imagePaths from "../AppBar/imagePaths";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import {
  addToWishlist,removeFromWishlist
} from "../../redux/slices/WishlistSlice";
import {favoriteFilterActivo, favoriteFilterDesactivo, noFavoriteFilterActivo, noFavoriteFilterDesactivo} from "../../redux/slices/filterSlice"
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';

const SearchCard = ({ image,id, name, price, product, favorite, favoriteNumFilter, favoriteDesFilter, favoriteDos, imageCloudinary, isAvailible  }) => {
  const dispatch = useDispatch();
  
  

  const [favorito, setFavorito] = useState(0)

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  
  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image, imageCloudinary }));
    toast.success("Added to cart successfully ");
  };

  
  
  
  const favoritesFilter = (e) =>{
    

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
    if( favoriteNumFilter === 1 || favoriteDesFilter === 2){
      toast.success("Delete to favorite succesfully");
      dispatch(noFavoriteFilterActivo(id))
      dispatch(favoriteFilterDesactivo(id))
      return dispatch(removeFromWishlist(product));
    }
    if (favoriteDesFilter === 1){
      dispatch(favoriteFilterActivo(id))
      dispatch(noFavoriteFilterDesactivo(id))

      dispatch(addToWishlist(product));
      toast.success("Added to favorite successfully ");
      return setFavorito(1)
    }
    if(favorite === true || favoriteDos=== true){
      dispatch(noFavoriteFilterActivo(id))
      dispatch(favoriteFilterDesactivo(id))


      toast.success("Delete to favorite succesfully");
      return dispatch(removeFromWishlist(product));
    }
    dispatch(favoriteFilterActivo(product))

    dispatch(addToWishlist(product));
    toast.success("Added to favorite successfully ");
    return setFavorito(1)
  
}
const getFavoriteIcon = () => {
  if(favoriteNumFilter === 1) {
    return imagePaths.Favorite.active;
  }
  if(favoriteDesFilter === 1){
    return imagePaths.Favorite.inactive;
  }
  if (favorite === false) {
    return imagePaths.Favorite.inactive;
  } 
  else {
    return imagePaths.Favorite.active;
  }
};



  return (
    <>
    {isAvailible === false ? null : 
  <div className="inline-flex flex-col items-start gap-[10px] relative my-5">
    
      <div className="relative bg-blue-100 rounded-3xl flex justify-center items-center">
        <Link to={`/detail/${id}`}>
        <img
          className="relative w-auto h-auto object-cover bg-black-500"
          alt="Rectangle"
          src={imageCloudinary ? imageCloudinary[0].url : image}
        />
      </Link>
      <img onClick={favoritesFilter}
            alt="Home"
            src={getFavoriteIcon()
            
            }
            className="w-8 h-8 opacity-80 absolute top-1 right-1"
            />
      </div>
    

    <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
      <div className="text-black-800 text-lg font-semibold">
      {name}</div>
    </div>

    <div className="w-full justify-around items-center">
      <div className="justify-between flex text-blue-600 text-lg font-semibold font-jakarta-sans leading-[28px] tracking-normal">
      $ {price}
      
      <div className="flex pb-30">
          <img 
          onClick={handleAddToCart}
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

export default SearchCard;
