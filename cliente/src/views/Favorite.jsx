import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Back from "../utils/images/BasicIcons/backIcon.png";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../redux/slices/WishlistSlice";
import WishlistCard from "../components/Cards/WishlistCard";
import wishIconPrev from "../../src/utils/images/Logo/WishIconPrev.png"

const Favorite = () => {
        const dispatch = useDispatch();
        const wishlist = useSelector((state) => state.wishlist);
        // const loginState = useSelector((state) => state.login);
        // console.log("login state", loginState);
      
        const handleRemoveFromWishlist = (productId) => {
          dispatch(removeFromWishlist({ id: productId }));
          alert("Item removed");
        };
      
        // if (!loginState.login) {
        //   return <Link to="/Account/SignUp">Go to SignUp</Link>;
        // }
      
        return (
          <div>
            <div className="flex flex-row gap-3 px-4 mb-8 mt-8 font-general-sans">
              <Link to={"/"}>
                <img src={Back} className="w-[30px] h-[30px]" alt="Back" />
              </Link>
              <p className="font-general-sans">Wishlist</p>
            </div>
            <div className="w-auto flex justify-center items-center pb-32">
              <div className="grid grid-cols-1 gap-1 justify-center mx-3 border font-bold">
                {wishlist.length > 0 ? (
                  wishlist.map((product) => (
                    <WishlistCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      description={product.description}
                      isInWishlist={true}
                      toggleWishlist={handleRemoveFromWishlist}
                    />
                  ))
                ) : (
      
                  <div >
                  <img className="flex items-center justify-center" src={wishIconPrev} alt="No products" />
                  <p className="text-red-600 text-lg font-semibold" style={{ marginLeft: "12px" }}> You still do not have products on Wishlist. </p>
                </div>       
                
                )}
              </div>
            </div>
          </div>
        );
}

export default  Favorite