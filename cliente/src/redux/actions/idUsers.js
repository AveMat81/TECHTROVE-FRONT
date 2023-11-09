import axios from "axios";
import { getUsersId } from "../slices/searchUsers";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 


const getIdUsers = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/users/${id}`);
      return dispatch(getUsersId(response.data));
    } catch (error) {
        console.error(error);
    }
  };
};

export default getIdUsers;
