import axios from "axios";
import { setFilterName } from "../slices/filterbynameSlice";

const getProductByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/api/products/?name=${name}`);
        dispatch(setFilterName(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default getProductByName;
