import axios from "axios";
import { setFilter } from "../slices/filterSlice";

const getFilter = (filterParams) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/api/products/filter`, {

        params: filterParams,
      });
      //Codigo nuevo

      const products = response.data.map((product) => ({
        ...product,
        favoriteFilter: 0, // Añade la propiedad istru con el valor false
        favoriteFilterDesactivado: 0,
        filtrosProps: 1,
      }));

      ////////
      dispatch(setFilter(products));
    } catch (error) {
      console.error(error);
    }
  };
};

export default getFilter;
