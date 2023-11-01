import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
import categoryReducer from "./slices/categorySlice";
import detailReducer from "./slices/detailSlice";
import userReducer from "./slices/userSlice";



  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    category: categoryReducer,
    detail: detailReducer,
    user: userReducer,
  });
  
  export default rootReducer;