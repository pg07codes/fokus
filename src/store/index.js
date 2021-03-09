import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../containers/taskBoard/taskBoardSlice";
import settingsReducer from "../containers/settings/settingsSlice";
import { getStateFromLocalStorage, setStateInLocalStorage, clearIfStateInvalidated } from "./localStorageUtils";

let store = configureStore({
    reducer: {
        tasks: tasksReducer,
        settings: settingsReducer,
    },
    preloadedState: getStateFromLocalStorage(),
});

store.subscribe(() => {
    // console.log("ls-used");
    setStateInLocalStorage(store.getState());
});

clearIfStateInvalidated();

export default store;
