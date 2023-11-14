import axios from "axios";
import { getProducts } from "../slices/productsSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const fetchProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/products`);
      const products = json.data.map((product) => ({
        ...product,
        favorite: 0, // Añade la propiedad istru con el valor false
        favoriteDesactivado: 0,
      }));
      return dispatch(getProducts(products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export default fetchProducts;
