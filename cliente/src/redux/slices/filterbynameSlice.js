import { createSlice } from "@reduxjs/toolkit"

const filterbynameSlice = createSlice ({

    name: "name",
    initialState : {
        filterbyname: [],

    },
    reducers: {
        setFilterName(state, action){
            state.filterbyname = action.payload
        },
        favoriteSearchActivo(state,action){
            const productId = action.payload;
            state.filterbyname = state.filterbyname.map((product) => {
              if (product.id === productId) {
                return { ...product, favoriteSearch: 1 };
              }
              return product; // Mantén los demás productos sin cambios
            });
          },
          favoriteSearchDesactivo(state,action){
            const productId = action.payload;
            state.filterbyname = state.filterbyname.map((product) => {
              if (product.id === productId) {
                return { ...product, favoriteSearch: 0 };
              }
              return product; // Mantén los demás productos sin cambios
            });
          },
          noFavoriteSearchActivo(state,action){
            const productId = action.payload;
            state.filterbyname = state.filterbyname.map((product) => {
              if (product.id === productId) {
                return { ...product, favoriteSearchDesactivado: 1 };
              }
              return product; // Mantén los demás productos sin cambios
            });
          },
          noFavoriteSearchDesactivo(state,action){
            const productId = action.payload;
            state.filterbyname = state.filterbyname.map((product) => {
              if (product.id === productId) {
                return { ...product, favoriteSearchDesactivado: 2 };
              }
              return product; // Mantén los demás productos sin cambios
            });
          },
    }
})

export const {setFilterName, favoriteSearchActivo, favoriteSearchDesactivo, noFavoriteSearchActivo, noFavoriteSearchDesactivo} = filterbynameSlice.actions
export default filterbynameSlice.reducer