import axios from "axios";
import { getAllOrders } from "../slices/allOrdersSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const fetchAllOrders = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/orders/`);
      const orders = json.data
      return dispatch(getAllOrders(orders));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export default fetchAllOrders;