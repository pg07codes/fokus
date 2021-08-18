import { createSlice } from "@reduxjs/toolkit";

export const colorOptions = {
    yellow: "#FABB18",
    orange: "#FBCEB1",
    pink: "#FFF0F5",
    green: "#D0F0C0",
    blue: "#E0FFFF",
    white: "#F8F8FF"
};

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notesArray: [],
        meta: {
            globalKey: 0,
            totalNoteCount: 0,
        },
    },
    reducers: {
        create: (notes, { payload }) => {
            notes.meta.totalNoteCount++;
            notes.notesArray.push(payload);
        },
        update: ({ notesArray }, { payload }) => {
            notesArray.forEach((i) => {
                if (i.id === payload.id) {
                    i.content = payload.noteContent;
                    i.color = payload.noteColor;
                }
            });
        },
        remove: (notes, { payload }) => {
            notes.notesArray = notes.notesArray.filter((i) => {
                if (i.id !== payload) return true;
                else return false;
            });
            notes.meta.totalNoteCount--;
        },
    },
});

export const { create, update, remove } = notesSlice.actions;

export default notesSlice.reducer;
