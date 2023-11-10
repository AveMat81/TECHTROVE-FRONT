
import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const favoritetSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {

    activeIcon: (state, action) => {
      return 1
      
    },
    iconDesactive: (state, action) => {
        return state - 1;
    },
  },
});

export const { activeIcon, iconDesactive } = favoritetSlice.actions;
export default favoritetSlice.reducer;