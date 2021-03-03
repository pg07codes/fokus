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
    },
});

export const { toggleDarkTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
