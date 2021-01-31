import { createSlice } from "@reduxjs/toolkit";

export const focusBoardSlice = createSlice({
    name: "focusBoard",
    initialState: {
        focussedTask:null
    },
    reducers: {
        focusOnTask: (state, { payload }) => {
           state.focussedTask=payload;
        },
    },
});

export const { focusOnTask} = focusBoardSlice.actions;

export default focusBoardSlice.reducer;
