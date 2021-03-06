import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        darkTheme: false,
        defaultLabel: null,
        defaultTime: 20,
        showTipsOnStartup: true,
        autoCompleteZeroTimeTask: false,
    },
    reducers: {
        toggleDarkTheme(settings, { payload }) {
            if (payload !== undefined) settings.darkTheme = payload;
            else settings.darkTheme = settings.darkTheme ? false : true;
        },
        updateDefaultTime(settings, { payload }) {
            settings.defaultTime = payload;
        },
        updateDefaultLabel(settings, { payload }) {
            settings.defaultLabel = payload;
        },
    },
});

export const { toggleDarkTheme , updateDefaultTime , updateDefaultLabel} = settingsSlice.actions;

export default settingsSlice.reducer;
