
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(window.localStorage.getItem("wishlist")) || [];



const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {

    addToWishlist: (state, action) => {
      const {id} = action.payload;
      // ahora verifico si el productos ya esta en la lista de wishlist
      if (!state.find(product => product.id === id)){
        //ahora si no esta lo agrega
        state.push(action.payload)
        window.localStorage.setItem("wishlist", JSON.stringify(state));  
      }
      
    },
    removeFromWishlist: (state, action) => {
      const {id} = action.payload;
      const newState = state.filter(product => product.id !== id);
      window.localStorage.setItem("wishlist", JSON.stringify(newState));
      return newState;
     
      // const {id} = action.payload
      // //y filtramos el productos basado en el ID
      
      // return state.filter(product => product.id !== id);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;