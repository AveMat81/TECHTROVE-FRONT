import axios from "axios";
import { updateBrand } from "../slices/brandSlice";


// const editBrand = (id, updatedBrandData) => {
//     return async (dispatch) => {
//       try {
//         const response = await axios.put(`http://localhost:3001/api/brands/${id}`, updatedBrandData);
//         const editedBrand = response.data;
//         dispatch(updateBrand(editedBrand));
//       } catch (error) {
//         console.error("Error editing brand:", error);
//       }
//     };
//   };
const editBrand = (id, updatedBrandData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/brands/${id}`,
        updatedBrandData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const editedBrand = response.data;
      dispatch(updateBrand(editedBrand));
    } catch (error) {
      console.error("Error editing brand:", error.response?.data || error.message);
    }
  };
};

  export default editBrand;