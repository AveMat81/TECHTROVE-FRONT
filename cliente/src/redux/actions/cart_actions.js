import { addToCart, removeFromCart, updateCart } from '../slices/cartSlice';

export const addProductToCart = (product) => (dispatch) => {
  dispatch(addToCart(product));
};

export const removeProductFromCart = (productId) => (dispatch) => {
  dispatch(removeFromCart(productId));
};

export const updateCartItem = (productId, newQuantity) => (dispatch) => {
  dispatch(updateCart({ id: productId, quantity: newQuantity }));
};
