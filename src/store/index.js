import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../containers/tasks/tasksSlice";
import focusBoardReducer from "../containers/focusBoard/focusBoardSlice";

export default configureStore({
    reducer: {
        tasks: tasksReducer,
        focusBoard:focusBoardReducer
    },
});
