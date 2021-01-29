import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./../containers/counter/counterSlice";
import tasksReducer from "../containers/tasks/tasksSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        tasks: tasksReducer
    },
});
