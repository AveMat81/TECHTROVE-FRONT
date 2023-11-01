import { createSlice } from "@reduxjs/toolkit"

const filterbynameSlice = createSlice ({

    name: "name",
    initialState : {
        filterbyname: [],

    },
    reducers: {
        setFilterName(state, action){
            state.filterbyname = action.payload
        }
    }
})

export const {setFilterName} = filterbynameSlice.actions
export default filterbynameSlice.reducer