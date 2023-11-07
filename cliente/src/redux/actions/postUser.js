import axios from "axios";
import { setUser } from "../slices/userSlice";

const postUser = (user) => {
    const endpoint = "http://localhost:3001/api/users/signUp"
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