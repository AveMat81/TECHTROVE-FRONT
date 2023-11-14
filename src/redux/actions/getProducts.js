import axios from "axios";
import { getProducts,updateRatingSuccess } from "../slices/productsSlice";
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
      dispatch(getProducts(products));

      products.forEach((product) => {
        dispatch(addRatingToProduct({ productId: product.id, rating: product.rating }));
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export const updateRating = (productId, newRating) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/products/rating/${productId}`, { rating: newRating });
    const updatedProduct = response.data;

    dispatch(updateRatingSuccess({ productId, rating: updatedProduct.rating }));
  } catch (error) {
    console.error("Error updating rating:", error);
  }
};

export default fetchProducts;
