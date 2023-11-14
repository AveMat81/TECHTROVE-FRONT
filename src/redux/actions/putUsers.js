import axios from "axios";
import { updateUser } from '../slices/changeUsersSlice';
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const updateUserOnServer = (id, data) => async (dispatch) => {
  try {
    const response = await axios(`${VITE_VERCEL_API_URL_BASE}/api/user/update/${id}`, data, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      dispatch(updateUser(updatedUser));
    } else {
    }
  } catch (error) {
    console.error(error);
  }
};

export default updateUserOnServer;