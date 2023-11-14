import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "orderId",
  initialState: {
    orderId: [],
  },
  reducers: {
    setOrderDetail(state, action) {
      state.orderId = action.payload;
    },
  },
});

export const { setOrderDetail } = detailSlice.actions;
export default detailSlice.reducer;
