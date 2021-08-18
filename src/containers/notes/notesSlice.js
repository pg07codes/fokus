import { createSlice } from "@reduxjs/toolkit";

export const colorOptions = {
    red:"red",
    green:"green",
    blue:"blue",
    pink:"pink",
    yellow:"yellow",
    white:"white"
};


export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notesArray:[],
        meta: {
            globalKey: 0,
            totalNoteCount: 0
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
                    i.color=payload.noteColor
                }
            });
        },
        remove: (notes, { payload }) => {
            notes.notesArray = notes.notesArray.filter((i) => {
                if (i.id !== payload) return true;
            });
            notes.meta.totalNoteCount--;
        },
    }
});

export const {
    create,
    update,
    remove
} = notesSlice.actions;

export default notesSlice.reducer;
