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
        resetFocussedTask: (focusBoard) => {
            focusBoard.focussedTask = null;
        },
        tick: (focusBoard) => {
            --focusBoard.focussedTask.remainingTime;
        },
        toggleIsRunning: (focusBoard, { payload }) => {
            if (payload !== undefined) focusBoard.focussedTask.isRunning = payload;
            else focusBoard.focussedTask.isRunning = !focusBoard.focussedTask.isRunning;
        },
        resetTask: (focusBoard) => {
            focusBoard.focussedTask.isRunning = false;
            focusBoard.focussedTask.remainingTime = focusBoard.focussedTask.time;
        },
        updateTaskTime: (focusBoard, { payload }) => {
            focusBoard.focussedTask.time += payload * 60;
            focusBoard.focussedTask.remainingTime += payload * 60;
        },
    },
});

export const { focusOnTask, resetFocussedTask, tick, resetTask, toggleIsRunning, updateTaskTime } = focusBoardSlice.actions;

export default focusBoardSlice.reducer;
