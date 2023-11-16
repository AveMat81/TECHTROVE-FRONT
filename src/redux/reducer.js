import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import filterReducer from "./slices/filterSlice";
import filternameReducer from "./slices/filterbynameSlice";
import categoryReducer from "./slices/categorySlice";
import detailReducer from "./slices/detailSlice";
import wishlistReducer from "./slices/WishlistSlice";
import favoritetSlice from "./slices/favoriteIcono"
import userReducer from "./slices/userSlice";
import allUsersSlice from "./slices/allUsersSlice";
import searchUsers from "./slices/searchUsers";
import changeUsersSlice from "./slices/changeUsersSlice";
import orderReducer from "./slices/orderUserSlice"
import cartReducer from "./slices/cartSlice"
import brands from "./slices/brandSlice"
import allOrders from "./slices/allOrdersSlice"


  const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    category: categoryReducer,
    filterName: filternameReducer,    
    wishlist: wishlistReducer,
    favorite: favoritetSlice,
    cart: cartReducer,
    detail: detailReducer,
    user: userReducer,
    allUsers: allUsersSlice,
    idUser: searchUsers,
    putuser: changeUsersSlice,
    orderR: orderReducer,
    brands: brands,
    allOrders: allOrders,
  });
  
  export default rootReducer;