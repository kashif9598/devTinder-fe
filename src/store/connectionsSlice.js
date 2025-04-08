import { createSlice } from "@reduxjs/toolkit";

export const connectionsSlice = createSlice({
    name: "connections",
    initialState : [],
    reducers :{
        addConnections : (state, action) => {
            return [...action.payload]
        },
    }
})

export const {addConnections, removeConnections} = connectionsSlice.actions;

export default connectionsSlice.reducer;
