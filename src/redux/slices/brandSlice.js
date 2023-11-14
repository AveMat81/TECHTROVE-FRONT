import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
    name: "brands",
    initialState: {
      brands: [], // Debe inicializarse como un array vacío
    },
  reducers: {
    getBrands(state, action) {
            state.brands = action.payload;
      
    },
    createBrand(state, action) {
      state.brands.push(action.payload);
    },
    deleteBrand(state, action) {
      state.brands = state.brands.filter(
        (brand) => brand.id !== action.payload
      );
    },
    updateBrand(state, action) {
      const { id, ...updatedBrand } = action.payload;
      const index = state.brands.findIndex((brand) => brand.id === id);
      if (index !== -1) {
        state.brands[index] = { ...state.brands[index], ...updatedBrand };
      }
    },
   
  },
});

export const { getBrands, createBrand,  deleteBrand, updateBrand } =
  brandSlice.actions;

export default brandSlice.reducer;
