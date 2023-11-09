import { createSlice } from "@reduxjs/toolkit";

const searchUsers = createSlice({
    name: "idUsers",
    initialState: {
      idUsers: [],
    },
    reducers: {
    getUsersId(state, action) {
         state.idUsers = action.payload;
      },
    },
  });
  
  export const { getUsersId } = searchUsers.actions;
  export default searchUsers.reducer;