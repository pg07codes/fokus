import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateDefaultTime } from "./settingsSlice";
import { InputDiv } from "./index";

const DefaultTaskTimeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 70px;
    background-color: ${(p) => p.theme.backgroundSecondary};
    p {
        display: inline-block;
        margin: 0 5px 0 0;
    }
`;

const TimeInput = styled.input`
    width: 50px;
    text-align: center;
    outline: none;
    border: 0;
    background-color: ${(p) => p.theme.backgroundSecondary};
    border-bottom: 2px ${(p) => p.theme.primaryText} solid;
    color: ${(p) => p.theme.primaryText};
    font-size: 1em;
    font-weight: bold;
    /* &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
    } */
`;

export function DefaultTaskTime() {

    const defaultTime = useSelector((s) => s.settings.defaultTime);
    const [updatedTime, setUpdatedTime] = useState(defaultTime);
    const dispatch = useDispatch();

    function onBlur(updatedTime) {
        updatedTime = updatedTime === "" ? 20 : updatedTime;
        updatedTime = updatedTime === "0" ? 20 : updatedTime;
        dispatch(updateDefaultTime(updatedTime));
    }

    return (
        <DefaultTaskTimeBox>
            <div>
                <p>Default Task Time </p>
                <span style={{ fontSize: "0.8em" }}>(1-120 mins)</span>
            </div>

            <InputDiv>
                <TimeInput
                    type="number"
                    min={1}
                    max={120}
                    onBlur={() => onBlur(updatedTime)}
                    value={updatedTime}
                    onChange={(e) => {
                        if (e.target.value >= 0 && e.target.value <= 120) setUpdatedTime(e.target.value);
                    }}
                    onKeyDown={(e) => (e.key === "Enter" ? onBlur(updatedTime) : null)}
                />
            </InputDiv>
        </DefaultTaskTimeBox>
    );
}
