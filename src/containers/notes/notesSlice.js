import { createSlice } from "@reduxjs/toolkit";

export const colorOptions = {
    pink: "#FFF0F5",
    green: "#D0F0C0",
    blue: "#E0FFFF",
    white: "#FFFFFF",
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
            notes.meta.globalKey++;
            notes.notesArray.unshift(payload);
        },
        update: ({ notesArray }, { payload }) => {
            notesArray.forEach((i) => {
                if (i.id === payload.id) {
                    i.content = payload.noteContent !== undefined ? payload.noteContent : i.content;
                    i.color = payload.noteColor !== undefined ? payload.noteColor : i.color;
                    i.updatedAt = new Date().toISOString();
                }
            });
        },
        remove: (notes, { payload }) => {
            notes.notesArray = notes.notesArray.filter((i) => {
                if (i.id !== payload && i.content.trim().length !== 0) return true;
                else return false;
            });
            notes.meta.totalNoteCount = notes.notesArray.length;
        },
    },
});

export const { create, update, remove } = notesSlice.actions;

export default notesSlice.reducer;
