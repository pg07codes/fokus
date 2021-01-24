import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        create: (state, { payload }) => {
            state.push(payload);
        },
        remove: (state, { payload }) => {
            return state.filter((i) => i.id !== payload);
        },
        update: (state, { payload }) => {
            state.forEach((i) => {
                if (i.id === payload.id) {
                    i = payload;
                }
            });
        },
        tick:(state, { payload }) => {
            state.forEach((i) => {
                if (i.id === payload) {
                    i.remainingTime = i.remainingTime -1;
                }
            });
        },
        reset: (state, { payload }) => {
            state.forEach((i) => {
                if (i.id === payload) {
                    i.remainingTime = i.time;
                    i.isRunning=false;
                }
            });
        },
        toggleIsRunning: (state, { payload }) => {
            state.forEach((i) => {
                if (i.id === payload) {
                    i.isRunning = !i.isRunning;
                }
            });
        },
        toggleIsCompleted:(state, { payload }) => {
            state.forEach((i) => {
                if (i.id === payload) {
                    i.isCompleted = !i.isCompleted;
                }
            });
        },
    },
});

export const { create, remove, update, reset, toggleIsRunning , tick , toggleIsCompleted} = tasksSlice.actions;

export default tasksSlice.reducer;
