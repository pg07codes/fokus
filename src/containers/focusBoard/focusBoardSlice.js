import { createSlice } from "@reduxjs/toolkit";

export const focusBoardSlice = createSlice({
    name: "focusBoard",
    initialState: {
        focussedTask: null,
    },
    reducers: {
        focusOnTask: (focusBoard, { payload }) => {
            focusBoard.focussedTask = payload;
        },
        resetFocussedTask:(focusBoard) => {
            focusBoard.focussedTask = null;
        },
        tick: (focusBoard) => {
            --focusBoard.focussedTask.remainingTime;
        },
        toggleIsRunning: (focusBoard) => {
            focusBoard.focussedTask.isRunning = !focusBoard.focussedTask.isRunning;
        },
        reset: (focusBoard) => {
            focusBoard.focussedTask.isRunning=false;
            focusBoard.focussedTask.remainingTime=focusBoard.focussedTask.time;
        },
    },
});

export const { focusOnTask , tick , reset, toggleIsRunning} = focusBoardSlice.actions;

export default focusBoardSlice.reducer;
