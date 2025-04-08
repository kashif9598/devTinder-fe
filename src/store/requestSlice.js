import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests : (state, action) => {
            return [...action.payload];
        },
        removeRequest : (state, action) => {
            const updatedRequests =  state.filter((r) => r._id !== action.payload)
            return updatedRequests;
        }
    },
});

export const {addRequests, removeRequest} = requestSlice.actions;

export default requestSlice.reducer;