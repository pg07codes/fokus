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
    width: 80%;
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
            <p>Dark Mode</p>
            <InputDiv>
                <Switch checked={darkTheme} offColor="#c1c1d7" onColor="#77dd77" onChange={() => dispatch(toggleDarkTheme())} />
            </InputDiv>
        </DarkModeDiv>
    );
}
