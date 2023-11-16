import { createSlice } from "@reduxjs/toolkit";

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState:{
    allOrders:[],
  },
  reducers: {
    getAllOrders(state, action) {
      state.allOrders = action.payload;
    },
  },
});

export const { getAllOrders } = allOrdersSlice.actions

export default allOrdersSlice.reducer;