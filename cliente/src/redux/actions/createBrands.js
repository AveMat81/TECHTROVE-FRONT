import axios from "axios";
import { createBrand } from "../slices/brandSlice";

const createBrands = (newBrandData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("http://localhost:3001/api/brands", newBrandData);
        const createdBrand = response.data;
        dispatch(createBrand(createdBrand));
      } catch (error) {
        console.error("Error creating brand:", error);
      }
    };
  };
  export default createBrands;