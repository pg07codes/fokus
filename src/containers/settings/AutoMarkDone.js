import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Switch from "react-switch";
import { toggleAutoCompleteZeroTimeTask } from "./settingsSlice";
import { InputDiv } from "./index";

const AutoMarkDoneDiv = styled.div`
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

export function AutoMarkDone() {
    const autoCompleteZeroTimeTask = useSelector((s) => s.settings.autoCompleteZeroTimeTask);
    const dispatch = useDispatch();

    return (
        <AutoMarkDoneDiv>
            <p>Mark task as done automatically when timer runs out</p>
            <InputDiv>
                <Switch checked={autoCompleteZeroTimeTask} offColor="#c1c1d7" onColor="#77dd77" onChange={() => dispatch(toggleAutoCompleteZeroTimeTask())} />
            </InputDiv>
        </AutoMarkDoneDiv>
    );
}
