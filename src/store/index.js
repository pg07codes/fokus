import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../containers/taskBoard/taskBoardSlice";
import settingsReducer from "../containers/settings/settingsSlice";

export default configureStore({
    reducer: {
        tasks: tasksReducer,
        settings:settingsReducer,
    },
});
