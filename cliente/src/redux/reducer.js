import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
import categoryReducer from "./slices/categorySlice";



  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    category: categoryReducer,


  });
  
  export default rootReducer;