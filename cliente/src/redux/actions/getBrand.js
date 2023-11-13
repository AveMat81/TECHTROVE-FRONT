import axios from "axios";
import { getBrands } from "../slices/brandSlice";

const fetchBrands = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/api/brands/");
      const brands = json.data.map((brand) => ({
        ...brand,
              }));  
     console.log(json);
      return dispatch(getBrands(brands));
   
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
};


export default  fetchBrands;
  




