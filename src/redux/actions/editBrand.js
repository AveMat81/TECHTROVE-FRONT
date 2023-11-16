import axios from "axios";
import { updateBrand } from "../slices/brandSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 


const editBrand = (id, updatedBrandData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${VITE_VERCEL_API_URL_BASE}/api/brands/${id}`,
        updatedBrandData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const editedBrand = response.data;
      dispatch(updateBrand(editedBrand));
    } catch (error) {
      console.error("Error editing brand:", error.response?.data || error.message);
    }
  };
};

  export default editBrand;