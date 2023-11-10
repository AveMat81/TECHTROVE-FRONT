import axios from "axios";
import { setProductDetail } from "../slices/detailSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const fetchProductById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/products/${id}`);
           
           dispatch(setProductDetail(response.data));
           
    } catch (error) {
      console.error("Error getting detail:", error);
    }
  };
};


export default fetchProductById;
