import axios from "axios";
import { getProducts } from "../slices/productsSlice";
import detailSlice from "../slices/detailSlice";
import createAsyncThunk from '@reduxjs/toolkit';

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

// const ProductId = (id) => {
//   return async function (dispatch){
//     try {
//       const json = await axios.get(`/api/products/${id}`);
//       const product = json.data;
//       return dispatch(detailSlice(id));
//     }catch{
//       console.log("Error finding product", error);
//     }
//   }
// }
 export const ProductId = createAsyncThunk('products/fetchProductById', async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export default {fetchProducts} ;
