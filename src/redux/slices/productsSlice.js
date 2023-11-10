import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState:{
    products:[],
  },
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.SKU !== action.payload
      );
    },
    filterProducts(state,action){
      state.products = action.payload;
    },
    updateProduct(state, action) {
      const { SKU, ...updatedProduct } = action.payload;
      const index = state.products.findIndex((product) => product.SKU === SKU);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
    favoriteActivo(state,action){
      const productId = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === productId) {
          return { ...product, favorite: 1 };
        }
        return product; // Mantén los demás productos sin cambios
      });
    },
    favoriteDesactivo(state,action){
      const productId = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === productId) {
          return { ...product, favorite: 0 };
        }
        return product; // Mantén los demás productos sin cambios
      });
    },
    noFavoriteActivo(state,action){
      const productId = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === productId) {
          return { ...product, favoriteDesactivado: 1 };
        }
        return product; // Mantén los demás productos sin cambios
      });
    },
    noFavoriteDesactivo(state,action){
      const productId = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === productId) {
          return { ...product, favoriteDesactivado: 2 };
        }
        return product; // Mantén los demás productos sin cambios
      });
    },
  },
});

export const { getProducts, addProduct, filterProducts, removeProduct, updateProduct, favoriteActivo, favoriteDesactivo, noFavoriteActivo, noFavoriteDesactivo } =
  productSlice.actions;

export default productSlice.reducer;
