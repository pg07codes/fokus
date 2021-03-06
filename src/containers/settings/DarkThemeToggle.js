import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Switch from "react-switch";
import { toggleDarkTheme } from "./settingsSlice";
import { InputDiv } from "./index";

const DarkModeDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    height: 70px;
    background-color: ${(p) => p.theme.backgroundSecondary};
    p {
        margin: 0;
    }
`;

export function DarkThemeToggle() {
    const darkTheme = useSelector((s) => s.settings.darkTheme);
    const dispatch = useDispatch();

    return (
        <DarkModeDiv>
            <p>Focus Dark Mode</p>
            <InputDiv>
                <Switch checked={darkTheme} offColor="#000" onColor="#fabb18" onChange={() => dispatch(toggleDarkTheme())} />
            </InputDiv>
        </DarkModeDiv>
    );
}
