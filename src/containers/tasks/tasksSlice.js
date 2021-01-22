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
        decrement: (state, { payload }) => {
            state.forEach((i) => {
                if (i.id === payload) {
                    i.remainingTime -= 1;
                }
            });
        },
    },
});

export const { create, remove, update, reset, toggleIsRunning , tick } = tasksSlice.actions;

export default tasksSlice.reducer;
