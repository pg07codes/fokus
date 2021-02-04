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
        resetTaskTime: (focusBoard) => {
            focusBoard.focussedTask.isRunning=false;
            focusBoard.focussedTask.remainingTime=focusBoard.focussedTask.time;
        },
        updateTaskTime:(focusBoard,{payload}) => {
            focusBoard.focussedTask.time+=(payload*60);
            focusBoard.focussedTask.remainingTime+=(payload*60);
        },
    },
});

export const { focusOnTask ,resetFocussedTask, tick , resetTaskTime, toggleIsRunning , updateTaskTime} = focusBoardSlice.actions;

export default focusBoardSlice.reducer;
