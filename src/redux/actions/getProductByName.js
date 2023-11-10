import axios from "axios";
import { setFilterName } from "../slices/filterbynameSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const getProductByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/products/?name=${name}`);

      const products = response.data.map((product) => ({
        ...product,
        favoriteSearch: 0, // Añade la propiedad istru con el valor false
        favoriteSearchDesactivado: 0,
      }));

        dispatch(setFilterName(products));
    } catch (error) {
      console.error(error);
    }
  };
};

export default getProductByName;
