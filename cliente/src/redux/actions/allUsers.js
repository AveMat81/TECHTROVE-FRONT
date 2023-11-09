import axios from "axios";
import {getUsers} from "../slices/allUsersSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 


const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      
      dispatch(getUsers(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default getAllUsers;
