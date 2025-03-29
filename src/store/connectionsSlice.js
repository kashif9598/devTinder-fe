import { createSlice } from "@reduxjs/toolkit";

export const connectionsSlice = createSlice({
    name: "connections",
    initialState : null,
    reducers :{
        addConnections : (state, action) => {
            return action.payload
        },
        removeConnections : (state, action) => {
            return null;
        }
    }
})

export const {addConnections, removeConnections} = connectionsSlice.actions;

export default connectionsSlice.reducer;
