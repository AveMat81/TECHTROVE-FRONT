import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
import categoryReducer from "./slices/categorySlice";
import detailReducer from "./slices/detailSlice";



  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    category: categoryReducer,


    detail: detailReducer,
  });
  
  export default rootReducer;