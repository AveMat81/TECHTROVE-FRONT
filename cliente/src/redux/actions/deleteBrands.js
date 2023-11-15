import axios from "axios";
 import { deleteBrand } from "../slices/brandSlice"; 

const deleteBrands = (id) => {
    return async (dispatch) => {
      try {
        console.log('Deleting brand with ID:', id);
        await axios.delete(`http://localhost:3001/api/brands/delete/${id}`);
        dispatch(deleteBrand(id));
        console.log('Brand deleted successfully.');
      } catch (error) {
        console.error("Error deleting brand by ID:", error);
      }
    };
  };
  
  export default deleteBrands;
