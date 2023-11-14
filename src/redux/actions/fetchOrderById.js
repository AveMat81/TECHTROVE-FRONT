import axios from "axios";
import { setOrderDetail } from "../slices/orderUserSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const fetchOrderById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/orders/${id}`);
           
           dispatch(setOrderDetail(response.data));
           
    } catch (error) {
      console.error("Error getting orders by id:", error);
    }
  };
};


export default fetchOrderById;
