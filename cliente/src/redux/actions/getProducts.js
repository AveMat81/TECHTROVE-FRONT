import axios from "axios";
import { getProducts } from "../slices/productsSlice";

const fetchProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/api/products");
      const products = json.data;
      return dispatch(getProducts(products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export default fetchProducts;
