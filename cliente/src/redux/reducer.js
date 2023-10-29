import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
<<<<<<< HEAD
import categoryReducer from "./slices/categorySlice";



  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    category: categoryReducer,


=======

  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
>>>>>>> 2b27c1646072dd4f06d62986c206f216eb3d3bf6
  });
  
  export default rootReducer;