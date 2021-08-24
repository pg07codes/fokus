import React from "react";
import styled from "styled-components";
import { FocusBoard } from "../focusBoard/FocusBoard";
import { MiscBoard } from "../miscBoard/MiscBoard";
const DashboardMainContainer = styled.div`
    flex: 3 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: red; */
`;

export function DashboardMain() {
    return (
        <DashboardMainContainer>
            <MiscBoard />
            <FocusBoard />
        </DashboardMainContainer>
    );
}
