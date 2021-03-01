import React, { useState } from "react";
import styled from "styled-components";
import Switch from "react-input-switch";

const DarkModeDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 75px;
    background-color: silver;
`;

export function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <DarkModeDiv>
            <p>Focus Dark Mode</p>
            <div>
            <Switch value={darkMode} onChange={setDarkMode} />
            </div>
            
        </DarkModeDiv>
    );
}
