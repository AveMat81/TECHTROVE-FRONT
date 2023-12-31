import axios from "axios";
import { setUser } from "../slices/userSlice";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const postUser = (user) => {
    const endpoint = `${VITE_VERCEL_API_URL_BASE}/api/users/signUp`
    return async (dispatch) => {
        try {
            const response = await axios.post(endpoint, user);
            let data = response.data;          
            return dispatch(setUser(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export default postUser;