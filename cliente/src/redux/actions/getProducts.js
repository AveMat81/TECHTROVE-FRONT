import axios from "axios";
import { getProducts } from "../slices/productsSlice";

const fetchProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/api/products");
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
