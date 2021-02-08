import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../containers/taskBoard/taskBoardSlice";

export default configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});
