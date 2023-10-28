import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: 'productById',
  initialState: {
    product: null,
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProductById.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(ProductById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.product = action.payload;
      })
      .addCase(ProductById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export default detailSlice.reducer;
