import React from "react";
import styled from "styled-components";
import { DarkThemeToggle } from "./DarkThemeToggle";
import { NotesViewToggle } from "./NotesViewToggle";
import { DefaultTaskTime } from "./DefaultTaskTime";
import { DefaultTaskLabel } from "./DefaultTaskLabel";
import { AutoMarkDone } from "./AutoMarkDone";

// exported and used for input fields in settings options
export const InputDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
`;

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
    justify-content: space-around;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.6);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.6);
    background-color: ${(p) => p.theme.backgroundSecondary};
    width: 70%;
    height: 80%;
    border-radius: 20px;
    color: ${(p) => p.theme.primaryText};
    font-weight: bold;
`;

const SettingsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    h1{
        letter-spacing:3px;
    }
`;
const SettingsOptions = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;


export default function Settings() {
    return (
        <SettingsContainer>
            <SettingsDiv>
                <SettingsHeader>
                    <h1>Settings</h1>
                </SettingsHeader>
                <SettingsOptions>
                    <DarkThemeToggle />
                    <DefaultTaskLabel />
                    <AutoMarkDone />
                    <NotesViewToggle />
                    <DefaultTaskTime />
                </SettingsOptions>
            </SettingsDiv>
        </SettingsContainer>
    );
}
