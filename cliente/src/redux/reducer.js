import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
import categoryReducer from "./slices/categorySlice";
import detailReducer from "./slices/detailSlice";
import wishlistReducer from "./slices/WishlistSlice";
import favoritetSlice from "./slices/favoriteIcono"


  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    favorite: favoritetSlice,
    detail: detailReducer,
  });
  
  export default rootReducer;