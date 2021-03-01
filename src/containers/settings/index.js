import React from "react";
import styled from "styled-components";
import { DarkModeToggle } from "./DarkModeToggle";
const SettingsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const SettingsDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.6);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.6);
    width: 70%;
    height: 90%;
    border-radius: 20px;
`;

export default function Settings() {
    return (
        <SettingsContainer>
            <SettingsDiv>
                Settings
                <DarkModeToggle />
            </SettingsDiv>
        </SettingsContainer>
    );
}
