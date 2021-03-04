import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateDefaultTime } from "./settingsSlice";

const DefaultTaskTimeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    height: 70px;
    background-color: ${(p) => p.theme.backgroundSecondary};
`;

const TimeInput = styled.input`
    width: 50px;
    text-align: center;
    outline: none;
    border: 0;
    background-color: ${(p) => p.theme.backgroundSecondary};
    border-bottom: 2px ${(p) => p.theme.primaryText} solid;
    color: ${(p) => p.theme.primaryText};
    font-size: 1.1em;
    font-weight: bold;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
    }
`;

export function DefaultTaskTime() {
    const defaultTime = useSelector((s) => s.settings.defaultTime);
    const dispatch = useDispatch();

    return (
        <DefaultTaskTimeBox>
            <div>
                <span>Default Task Time </span>
                <span style={{fontSize:"0.8em"}}>(in mins)</span>
            </div>

            <TimeInput
                type="number"
                min={1}
                max={120}
                value={defaultTime}
                onChange={(e) => {
                    if (e.target.value >= 0 && e.target.value <= 120) dispatch(updateDefaultTime(e.target.value));
                }}
            />
        </DefaultTaskTimeBox>
    );
}
