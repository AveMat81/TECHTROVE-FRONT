import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice ({

    name: "filter",
    initialState : {
        filterResult: [],

    },
    reducers: {
        setFilter(state, action){
            state.filterResult = action.payload
        },
        favoriteFilterActivo(state,action){
            const productId = action.payload;
            state.filterResult = state.filterResult.map((product) => {
              if (product.id === productId) {
                return { ...product, favoriteFilter: 1 };
              }
              return product; // Mantén los demás productos sin cambios
            });
          },
          favoriteFilterDesactivo(state,action){
            const productId = action.payload;
            state.filterResult = state.filterResult.map((product) => {
              if (product.id === productId) {
                return { ...product, favoriteFilter: 0 };
              }
              return product; // Mantén los demás productos sin cambios
            });
          },
          noFavoriteFilterActivo(state,action){
            const productId = action.payload;
            state.filterResult = state.filterResult.map((product) => {
              if (product.id === productId) {
                return { ...product, favoriteFilterDesactivado: 1 };
              }
              return product; // Mantén los demás productos sin cambios
            });
          },
          noFavoriteFilterDesactivo(state,action){
            const productId = action.payload;
            state.filterResult = state.filterResult.map((product) => {
              if (product.id === productId) {
                return { ...product, favoriteFilterDesactivado: 2 };
              }
              return product; // Mantén los demás productos sin cambios
            });
          },
    }
})

export const {setFilter, favoriteFilterActivo, favoriteFilterDesactivo, noFavoriteFilterActivo, noFavoriteFilterDesactivo} = filterSlice.actions
export default filterSlice.reducer