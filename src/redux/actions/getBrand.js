import axios from "axios";
import { getBrands } from "../slices/brandSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const fetchBrands = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/brands`);
      const brands = json.data.map((brand) => ({
        ...brand,
              }));  
     console.log(json);
      return dispatch(getBrands(brands));
   
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
};


export default  fetchBrands;
  



