import axios from "axios";
import { createBrand } from "../slices/brandSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const createBrands = (newBrandData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${VITE_VERCEL_API_URL_BASE}/api/brands`, newBrandData);
        const createdBrand = response.data;
        dispatch(createBrand(createdBrand));
      } catch (error) {
        console.error("Error creating brand:", error);
      }
    };
  };
  export default createBrands;