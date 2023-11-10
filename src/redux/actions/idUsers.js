import axios from "axios";
import { getUsersId } from "../slices/searchUsers";


const getIdUsers = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${id}`);
      return dispatch(getUsersId(response.data));
    } catch (error) {
        console.error(error);
    }
  };
};

export default getIdUsers;
