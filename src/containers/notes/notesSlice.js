import { createSlice } from "@reduxjs/toolkit";


export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notesArray:["1.some note","2.one other note","3.note for me"]
    },
    reducers: {
    }
});

export const {
    
} = notesSlice.actions;

export default notesSlice.reducer;
