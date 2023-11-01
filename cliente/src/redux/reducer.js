import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
import filternameReducer from "./slices/filterbynameSlice";
import categoryReducer from "./slices/categorySlice";
import detailReducer from "./slices/detailSlice";



  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    category: categoryReducer,
    filterName: filternameReducer,

    detail: detailReducer,
  });
  
  export default rootReducer;