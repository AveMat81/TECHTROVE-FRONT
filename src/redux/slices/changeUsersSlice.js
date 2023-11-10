import { createSlice } from "@reduxjs/toolkit";

const changeUsersSlice = createSlice({
  name: 'putuser',
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateUser } = changeUsersSlice.actions;
export default changeUsersSlice.reducer;