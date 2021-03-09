import { CURRENT_VERSION } from "./../helpers/constants";

export function getFokusVersion() {
    try {
        return localStorage.getItem("version");
    } catch (e) {
        console.error(e.message);
    }
}

export function setFokusVersion(version) {
    try {
        localStorage.setItem("version", version);
    } catch (e) {
        console.error(e.message);
    }
}

export function getStateFromLocalStorage() {
    try {
        let serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        let state = JSON.parse(serializedState);

        // values to be reset on refresh
        if (state !== undefined) {
            if (state.tasks.meta.focussedTaskIndex !== -1) {
                state.tasks.taskArray[state.tasks.meta.focussedTaskIndex].isRunning = false;
                state.tasks.meta.focussedTaskIndex = -1;
            }
            state.tasks.soundscape.isPlaying = false;
        }
        // values to be reset on refresh

        return state;
    } catch (e) {
        console.error(e.message);
        return undefined;
    }
}

export function setStateInLocalStorage(state) {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.log("There was some error in persisting the state. Maybe you're in incognito/private window.");
        console.error(e.message);
    }
}

export function clearStateFromLocalStorage() {
    try {
        if (localStorage.getItem("state") !== null) localStorage.removeItem("state");
    } catch (e) {
        console.error(e.message);
    }
}

export function shouldClearStateFromLocalStorage(currentVersion) {
    try {
        let version = localStorage.getItem("version");
        if (version === null) {
            return true;
        }
        version = parseInt(version);
        if (currentVersion > version) return true;
        else return false;
    } catch (e) {
        console.error(e.message);
    }
}

export function clearIfStateInvalidated() {
    if (shouldClearStateFromLocalStorage(CURRENT_VERSION)) {
        clearStateFromLocalStorage();
        setFokusVersion(CURRENT_VERSION);
    }
}
