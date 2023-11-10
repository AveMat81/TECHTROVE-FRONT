import axios from "axios";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 


export function editProduct(id, payload) {
  return async function () {
    try {
      const response = await axios.put(`${VITE_VERCEL_API_URL_BASE}/api/products/update/${id}`, payload);
      return response;
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };
}
