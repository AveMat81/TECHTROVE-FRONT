import axios from "axios";
import { setFilter } from "../slices/filterSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 


const getFilter = (filterParams) => {
  return async function (dispatch,getState) {
    try {
      const response = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/products/filter`, {

        params: filterParams,
      });
      

      const products = response.data.map((product) => ({
        ...product,
        favoriteFilter: 0, // Añade la propiedad istru con el valor false
        favoriteFilterDesactivado: 0,
        filtrosProps: 1,
      }));

      ////////
      dispatch(setFilter(products));
    } catch (error) {
      console.error(error);
    }
  };
};

export default getFilter;
