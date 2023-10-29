import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";

  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
  });
  
  export default rootReducer;