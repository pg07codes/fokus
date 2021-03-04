import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const TaskSelectInput = styled.select`
    font-weight: bold;
    text-align: center;
    border:0;
    background-color:${p=>p.theme.backgroundSecondary};
    color:${p=>p.theme.primaryText};
    option{
        font-weight:bold;
    }
`;

export default function TaskLabel(p) {
    const labels = useSelector((s) => s.tasks.labels);
    const [updatedLabel, setUpdatedLabel] = useState(p.taskLabel);

    return (
        // <div style={{ height: "100%", width: 80 }}>
        <TaskSelectInput
        autoFocus
            name="labels"
            onBlur={() => p.onBlur(p.taskId,p.taskLabel, updatedLabel)}
            defaultValue={updatedLabel}
            onChange={(e) => setUpdatedLabel(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? p.onBlur(p.taskId,p.taskLabel, updatedLabel) : null)}
        >
            <option value="none">none</option> 
            {/* keeping option:none at top makes it show up if taskLabel is null which is desired */}
            {Object.keys(labels).map((e, idx) => (
                <option style={{color:`${labels[e].color}`}} key={idx} value={e}>
                    {e}
                </option>
            ))}
        </TaskSelectInput>
        // </div>
    );
}
