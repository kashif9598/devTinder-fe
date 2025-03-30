import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests : (state, action) => {
            return [...action.payload];
        },
    },
});

export const {addRequests} = requestSlice.actions;

export default requestSlice.reducer;