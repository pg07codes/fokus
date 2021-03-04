import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Switch from "react-switch";
import { toggleDarkTheme } from "./settingsSlice";

const DarkModeDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    height: 70px;
    background-color: ${(p) => p.theme.backgroundSecondary};
`;

export function DarkThemeToggle() {
    const darkTheme = useSelector((s) => s.settings.darkTheme);
    const dispatch = useDispatch();

    return (
        <DarkModeDiv>
            <p>Focus Dark Mode</p>
            <Switch checked={darkTheme} onChange={() => dispatch(toggleDarkTheme())} />
        </DarkModeDiv>
    );
}
