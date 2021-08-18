import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../containers/taskBoard/taskBoardSlice";
import settingsReducer from "../containers/settings/settingsSlice";
import notesReducer from "../containers/notes/notesSlice";
import { getStateFromLocalStorage, setStateInLocalStorage, clearIfStateInvalidated } from "./localStorageUtils";
import { debounce } from "../helpers";

let store = configureStore({
    reducer: {
        tasks: tasksReducer,
        settings: settingsReducer,
        notes: notesReducer,
    },
    preloadedState: getStateFromLocalStorage(),
});

store.subscribe(
    debounce(() => {
        // console.log("ls-used");
        setStateInLocalStorage(store.getState());
    }, 200)
);

clearIfStateInvalidated();

export default store;
