import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: window.localStorage.getItem("userData") || null,
  watchlist : [],
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser(state, action) {
        state.user = action.payload;
        window.localStorage.setItem("userData", JSON.stringify(action.payload) 
        )
      },
      clearUser(state) {
        state.user = null;
      },

      addToWishlist(state, action) {
        const { id } = action.payload;
        if (!state.wishlist.find((product) => product.id === id)) {
          state.wishlist.push(action.payload);
        }
      },
  
      removeFromWishlist: (state, action) => {
        const { id } = action.payload;
  
        state.wishlist = state.wishlist.filter((product) => product.id !== id);
      },

    },
  });
  
  export const { setUser, clearUser, addToWishlist, removeFromWishlist} = userSlice.actions;
  export default userSlice.reducer;