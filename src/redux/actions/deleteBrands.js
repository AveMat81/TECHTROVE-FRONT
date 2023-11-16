import axios from "axios";
 import { deleteBrand } from "../slices/brandSlice"; 
 const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const deleteBrands = (id) => {
    return async (dispatch) => {
      try {
        
        await axios.delete(`${VITE_VERCEL_API_URL_BASE}/api/brands/delete/${id}`);
        dispatch(deleteBrand(id));
        
      } catch (error) {
        console.error("Error deleting brand by ID:", error);
      }
    };
  };
  
  export default deleteBrands;
