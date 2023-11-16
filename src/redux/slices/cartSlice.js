import { createSlice } from "@reduxjs/toolkit";

export const totalCount = (price1, price2, ) => price1 + price2 ;

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(window?.localStorage?.getItem("cart")) || {
    items: [],
    subtotal: 0,
    quantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.subtotal = state.items.reduce(
        (subtotal, item) => subtotal + item.price * item.quantity,
        0
      );

      state.totalPrice = totalCount(
        state.subtotal,
       
      );

      state.quantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    removeItem(state, action) {
      const productId = action.payload;
      const updatedItems = state.items.filter((item) => item.id !== productId);

      state.items = updatedItems;

      state.subtotal = state.items.reduce(
        (subtotal, item) => subtotal + item.price * item.quantity,
        0
      );
      state.totalPrice = totalCount(
        state.subtotal,
        
      );
    },

    setQuantity(state, action) {
      const { id, act } = action.payload;

      const itemToUpdate = state.items.find((item) => item.id === id);

      console.log(itemToUpdate);
      if (itemToUpdate) {
        if (act === "+") {
          itemToUpdate.quantity++;
        } else if (act === "-") {
          itemToUpdate.quantity = Math.max(itemToUpdate.quantity - 1, 0);
          // itemToUpdate.quantity =
          //   act === "+"
          //     ? itemToUpdate.quantity + 1
          //     : Math.max(itemToUpdate.quantity - 1, 0);

          if (itemToUpdate.quantity === 0) {
            state.items = state.items.filter((item) => item.id !== id);
          }
        }
        state.subtotal = state.items.reduce(
          (subtotal, item) => subtotal + item.price * item.quantity,
          0
        );
        state.totalPrice = totalCount(
          state.subtotal,
          
        );
      }
    },

    cleanCart(state) {
      state.items = [];
      state.subtotal = 0;
      state.totalPrice = 0;
      state.quantity = 0;
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.subtotal = action.payload.subtotal;
      state.shippingPrice = action.payload.shippingPrice;
      state.tax = action.payload.tax;
      state.quantity = action.payload.quantity;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { addToCart, removeItem, setQuantity, cleanCart, replaceCart } =
  cartSlice.actions;
export default cartSlice.reducer;
