import { createSlice } from "@reduxjs/toolkit";


export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notesArray:[]
    },
    reducers: {
        create: (notes, { payload }) => {
            notes.notesArray.push(payload);
        },
    }
});

export const {
    create
} = notesSlice.actions;

export default notesSlice.reducer;
