import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
    name: "allUsers",
    initialState: {
      allUsers: [],
    },
    reducers: {

    getUsers(state, action) {
         state.allUsers = action.payload;
      },
    }
  });
  
  export const { getUsers } = allUserSlice.actions;
  export default allUserSlice.reducer;