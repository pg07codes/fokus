import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../containers/taskBoard/taskBoardSlice";
import focusBoardReducer from "../containers/focusBoard/focusBoardSlice";

export default configureStore({
    reducer: {
        tasks: tasksReducer,
        focusBoard:focusBoardReducer
    },
});
