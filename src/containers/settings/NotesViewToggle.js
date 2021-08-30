import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Switch from "react-switch";
import { toggleNotesView } from "./settingsSlice";
import { InputDiv } from "./index";

const NotesViewDiv = styled.div`
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

export function NotesViewToggle() {
    const isGridView = useSelector((s) => s.settings.isGridView);
    const dispatch = useDispatch();

    return (
        <NotesViewDiv>
            <p>Notes View Grid</p>
            <InputDiv>
                <Switch checked={isGridView} offColor="#c1c1d7" onColor="#77dd77" onChange={() => dispatch(toggleNotesView())} />
            </InputDiv>
        </NotesViewDiv>
    );
}
