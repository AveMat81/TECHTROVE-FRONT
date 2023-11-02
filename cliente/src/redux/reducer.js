import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
import filternameReducer from "./slices/filterbynameSlice";
import categoryReducer from "./slices/categorySlice";
import detailReducer from "./slices/detailSlice";
import wishlistReducer from "./slices/WishlistSlice";
import favoritetSlice from "./slices/favoriteIcono"
import userReducer from "./slices/userSlice";



  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    category: categoryReducer,
    filterName: filternameReducer,    
    wishlist: wishlistReducer,
    favorite: favoritetSlice,
    detail: detailReducer,
    user: userReducer,
  });
  
  export default rootReducer;