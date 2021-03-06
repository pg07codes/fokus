import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateDefaultLabel } from "./settingsSlice";
import { InputDiv } from "./index";

const DefaultTaskLabelBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 70px;
    background-color: ${(p) => p.theme.backgroundSecondary};
    p {
        display: inline-block;
        margin: 0;
    }
`;

const LabelInput = styled.select`
    font-weight: bold;
    text-align: center;
    border: 0;
    background-color: ${(p) => p.theme.backgroundSecondary};
    color: ${(p) => p.theme.primaryText};
    font-size:0.8em;
    option {
        font-weight: bold;
    }
`;

export function DefaultTaskLabel() {
    const labels = useSelector((s) => s.tasks.labels);

    const defaultLabel = useSelector((s) => s.settings.defaultLabel);
    const [updatedLabel, setUpdatedLabel] = useState(defaultLabel);
    const dispatch = useDispatch();

    function onBlur(updatedLabel) {
        updatedLabel = updatedLabel === "none" ? null : updatedLabel;
        dispatch(updateDefaultLabel(updatedLabel));
    }

    return (
        <DefaultTaskLabelBox>
            <div>
                <p>Default Task Label </p>
            </div>

            <InputDiv>
                <LabelInput
                    name="labels"
                    onBlur={() => onBlur(updatedLabel)}
                    defaultValue={updatedLabel}
                    onChange={(e) => setUpdatedLabel(e.target.value)}
                    onKeyDown={(e) => (e.key === "Enter" ? onBlur(updatedLabel) : null)}
                >
                    <option value="none">none</option>
                    {/* keeping option:none at top makes it show up if taskLabel is null which is desired */}
                    {Object.keys(labels).map((e, idx) => (
                        <option style={{ color: `${labels[e].color}` }} key={idx} value={e}>
                            {e}
                        </option>
                    ))}
                </LabelInput>
            </InputDiv>
        </DefaultTaskLabelBox>
    );
}
