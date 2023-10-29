import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
import detailReducer from "./slices/detailSlice";
  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    detail: detailReducer,
  });
  
  export default rootReducer;