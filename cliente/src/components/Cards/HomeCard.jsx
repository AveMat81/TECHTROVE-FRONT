// import {Link} from "react-router-dom"
// import imagePaths from "../AppBar/imagePaths";
// import toast, { Toaster } from "react-hot-toast";
// import React from "react";
// import { useState } from "react";
// import {
//   addToWishlist,removeFromWishlist
// } from "../../redux/slices/WishlistSlice";
// import {favoriteActivo, favoriteDesactivo, noFavoriteActivo, noFavoriteDesactivo} from "../../redux/slices/productsSlice"
// import {favoriteFilterActivo, favoriteFilterDesactivo, noFavoriteFilterActivo, noFavoriteFilterDesactivo} from "../../redux/slices/filterSlice"
// import {activeIcon, iconDesactive} from "../../redux/slices/favoriteIcono"
// import { useSelector, useDispatch } from "react-redux";
//  import { addToCart } from "../../redux/slices/cartSlice";


// const HomeCard = (id, name, image, price,product,  funcion, finalla,favorite, favoriteNum, favoriteDes, filtrosProps, favoriteNumFilter, favoriteDesFilter) => {
//   // console.log("holalaal" + filtrosProps)
//   // console.log(favoriteNum)
//   // console.log("home card " + favorite)
 
//   // const wishlist = useSelector((state) => state.wishlist);
//   const favoritoo = useSelector((state) => state.favorite)
//   const dispatch = useDispatch();
//   // console.log(wishlist)


//   const productDet = useSelector((state) => state.detail.detail);
  
//   const productH =useSelector((state) => state.products);
  
//   const favorites = (e) =>{
//     if( favoriteNum === 1 || favoriteDes === 2){
//       console.log("normal")
//       // const favorito2 = favoritoo - 1;
//       // setFavorito(favorito2)
//       // dispatch(iconDesactive())
//       // dispatch(favoriteActivo(id))
//       dispatch(noFavoriteActivo(id))
//       dispatch(favoriteDesactivo(id))
//       return dispatch(removeFromWishlist(product));
//     }
//     if (favoriteDes === 1){
//       console.log("normal")
//       dispatch(favoriteActivo(id))
//       dispatch(noFavoriteDesactivo(id))
//     // dispatch(activeIcon())
//       dispatch(addToWishlist(product));
//       toast.success("Added to favorite successfully ");
//       return setFavorito(1)
//     }
//     if(favorite === true){
//       console.log("normal")


//       // const favorito2 = favoritoo - 1;
//       // setFavorito(favorito2)
//       // dispatch(iconDesactive())
//       // dispatch(favoriteActivo(id))
//       console.log("normal")
//       dispatch(noFavoriteActivo(id))
//       dispatch(favoriteDesactivo(id))
//       return dispatch(removeFromWishlist(product));
//     }
//     //await
//     // funcion()
//     // finalla(id)
//     dispatch(favoriteActivo(id))
//     // dispatch(activeIcon())
//     dispatch(addToWishlist(product));
//     toast.success("Added to favorite successfully ");
//     return setFavorito(1)
//   }
//   const favoritesFilter = (e) =>{
//     if( favoriteNumFilter === 1 || favoriteDesFilter === 2){
//       console.log("filter")
//       // const favorito2 = favoritoo - 1;
//       // setFavorito(favorito2)
//       // dispatch(iconDesactive())
//       // dispatch(favoriteActivo(id))
//       dispatch(noFavoriteFilterActivo(id))
//       dispatch(favoriteFilterDesactivo(id))
//       return dispatch(removeFromWishlist(product));
//     }
//     if (favoriteDesFilter === 1){
//       console.log("filter")
//       dispatch(favoriteFilterActivo(id))
//       dispatch(noFavoriteFilterDesactivo(id))
//     // dispatch(activeIcon())
//       dispatch(addToWishlist(product));
//       toast.success("Added to favorite successfully ");
//       return setFavorito(1)
//     }
//     if(favorite === true){
//       console.log("filter")
//       dispatch(noFavoriteFilterActivo(id))
//       dispatch(favoriteFilterDesactivo(id))


//       // const favorito2 = favoritoo - 1;
//       // setFavorito(favorito2)
//       // dispatch(iconDesactive())
//       // dispatch(favoriteActivo(id))
//       return dispatch(removeFromWishlist(product));
//     }
//     console.log("filter")
//     //await
//     // funcion()
//     // finalla(id)
//     dispatch(favoriteFilterActivo(id))
//     // dispatch(activeIcon())
//     dispatch(addToWishlist(product));
//     toast.success("Added to favorite successfully ");
//     return setFavorito(1)

// }
// const getFavoriteIcon = () => {
//   if(favoriteNumFilter === 1) {
//     return imagePaths.Favorite.active;
//   }
//   if(favoriteDesFilter === 1){
//     return imagePaths.Favorite.inactive;
//   }
//   ////////
//   if(favoriteNum === 1) {
//     return imagePaths.Favorite.active;
//   }
//   if(favoriteDes === 1){
//     return imagePaths.Favorite.inactive;
//   }
//   if (favorite === false) {
//     return imagePaths.Favorite.inactive;
//   } 
//   else {
//     return imagePaths.Favorite.active;
//   }
// };
  

//   const handleAddToCart = () => {
//     const productData = {
//       id: productDet.id,
//       name: productDet.name,
//       price: productDet.price,
//       image: productDet.image,
//       description: productDet.description,
//     };
//     toast.success("Added to cart successfully ");
//   console.log(productData);
//     dispatch(addToCart(productData));
//   };
//   const favoriteDefinitivo = (e) =>{
//     if(filtrosProps !== 1){
//       console.log("normal")
//       return favorites()
//     }
//     if(filtrosProps === 1){
//       console.log("filter")
//       return favoritesFilter()
//     }

//   }
  

//   // const favorite = (e) =>{
//   //   toast.success("Added to favorite successfully ");
//   // }

  
//   return (
//     <div className="inline-flex flex-col items-start gap-[8px] relative">
//         {/* <div className="w-[160px] h-[160px] relative bg-violet-50 rounded-3xl"> */}
//         <div className="relative bg-violet-50 rounded-3xl flex justify-center items-center">
//           <Link to={`/${id}`}>
//           <img
//             className="relative w-auto h-auto object-cover"
//             alt="Rectangle"
//             src={image}
//           />
//         {/* <button class="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1">Botón</button> */}
//         </Link>
//         <img onClick={favoriteDefinitivo}
//               alt="Home"
//               src={
//                 getFavoriteIcon()
//               }
//               className="w-8 h-8 opacity-80 absolute top-1 right-1"
//               />
//         </div>
      

//       <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
//         <div className="text-left text-stone-900 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal">
//         {name}</div>
//       </div>

//       <div className="w-full justify-around items-center">
//         <div className="justify-between flex text-red-600 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal text-[20px]">
//         $ {price}
        
//         <div className="flex pb-30">
//             <img onClick={handleAddToCart}
//               alt="Home"
//               src={
//                 imagePaths.Add.inactive
//               }
//               className="w-8 h-8 opacity-40"
//               />
//         </div>
//         </div>

//       </div>

      
//     </div>
//   );
// };

// export default HomeCard;


import {Link} from "react-router-dom"
import imagePaths from "../AppBar/imagePaths";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { useState } from "react";
import {
  addToWishlist,removeFromWishlist
} from "../../redux/slices/WishlistSlice";
import {favoriteActivo, favoriteDesactivo, noFavoriteActivo, noFavoriteDesactivo} from "../../redux/slices/productsSlice"
import {favoriteFilterActivo, favoriteFilterDesactivo, noFavoriteFilterActivo, noFavoriteFilterDesactivo} from "../../redux/slices/filterSlice"
import {activeIcon, iconDesactive} from "../../redux/slices/favoriteIcono"
import { useSelector, useDispatch } from "react-redux";

const HomeCard = ({ image,id, name, price, product, favorite, funcion, finalla, favoriteNum, favoriteDes, filtrosProps, favoriteNumFilter, favoriteDesFilter  }) => {
  // console.log("holalaal" + filtrosProps)
  // console.log(favoriteNum)
  // console.log("home card " + favorite)
  
  const wishlist = useSelector((state) => state.wishlist);
  const favoritoo = useSelector((state) => state.favorite)
  const dispatch = useDispatch();
  // console.log(wishlist)

  const [favorito, setFavorito] = useState(0)
  const [addedProducts, setAddedProducts] = useState([]);
  // console.log(addedProducts)

  const prueba = (e) =>{
    toast.success("Added to cart successfully ");
  }

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

  const favoriteDefinitivo = (e) =>{
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
      console.log("normal")
      // const favorito2 = favoritoo - 1;
      // setFavorito(favorito2)
      // dispatch(iconDesactive())
      // dispatch(favoriteActivo(id))
      dispatch(noFavoriteActivo(id))
      dispatch(favoriteDesactivo(id))
      return dispatch(removeFromWishlist(product));
    }
    if (favoriteDes === 1){
      console.log("normal")
      dispatch(favoriteActivo(id))
      dispatch(noFavoriteDesactivo(id))
    // dispatch(activeIcon())
      dispatch(addToWishlist(product));
      toast.success("Added to favorite successfully ");
      return setFavorito(1)
    }
    if(favorite === true){
      console.log("normal")


      // const favorito2 = favoritoo - 1;
      // setFavorito(favorito2)
      // dispatch(iconDesactive())
      // dispatch(favoriteActivo(id))
      console.log("normal")
      dispatch(noFavoriteActivo(id))
      dispatch(favoriteDesactivo(id))
      return dispatch(removeFromWishlist(product));
    }
    //await
    // funcion()
    // finalla(id)
    dispatch(favoriteActivo(id))
    // dispatch(activeIcon())
    dispatch(addToWishlist(product));
    toast.success("Added to favorite successfully ");
    return setFavorito(1)
  }
  
  const favoritesFilter = (e) =>{
      if( favoriteNumFilter === 1 || favoriteDesFilter === 2){
        console.log("filter")
        // const favorito2 = favoritoo - 1;
        // setFavorito(favorito2)
        // dispatch(iconDesactive())
        // dispatch(favoriteActivo(id))
        dispatch(noFavoriteFilterActivo(id))
        dispatch(favoriteFilterDesactivo(id))
        return dispatch(removeFromWishlist(product));
      }
      if (favoriteDesFilter === 1){
        console.log("filter")
        dispatch(favoriteFilterActivo(id))
        dispatch(noFavoriteFilterDesactivo(id))
      // dispatch(activeIcon())
        dispatch(addToWishlist(product));
        toast.success("Added to favorite successfully ");
        return setFavorito(1)
      }
      if(favorite === true){
        console.log("filter")
        dispatch(noFavoriteFilterActivo(id))
        dispatch(favoriteFilterDesactivo(id))
  
  
        // const favorito2 = favoritoo - 1;
        // setFavorito(favorito2)
        // dispatch(iconDesactive())
        // dispatch(favoriteActivo(id))
        return dispatch(removeFromWishlist(product));
      }
      console.log("filter")
      //await
      // funcion()
      // finalla(id)
      dispatch(favoriteFilterActivo(id))
      // dispatch(activeIcon())
      dispatch(addToWishlist(product));
      toast.success("Added to favorite successfully ");
      return setFavorito(1)
    
  }

  return (
    <div className="inline-flex flex-col gap-[8px] relative">
        {/* <div className="w-[160px] h-[160px] relative bg-violet-50 rounded-3xl items-start"> */}
        <div className="relative bg-violet-50 rounded-3xl flex justify-center items-center">
          <Link to={`/${id}`}>
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
        <div className="justify-between flex text-red-600 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal text-[20px]">
        $ {price}
        
        <div className="flex pb-30">
            <img onClick={prueba}
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
  );
};

export default HomeCard;
