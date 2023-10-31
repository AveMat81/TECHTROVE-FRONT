import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {items:[]},
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart : (state, action)=> {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateCart: (state, action) => {
            const {id, quantity} = action.payload;
            const item = state.items.find(item => item.id ===id);
            if(item){
                item.quantity = quantity;
            }
        },

    },
});

export const {addToCart, removeFromCart, updateCart} = CartSlice.actions;
export default CartSlice.reducer;


