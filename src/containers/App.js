import React from "react";
import { TaskBoard } from "./taskBoard/TaskBoard";
import { FocusBoard } from "./focusBoard/FocusBoard";
import { MiscBoard } from "./miscBoard/MiscBoard";
import { Menu } from "./menu/Menu";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { MobileView } from "./MobileView";

const AppContainer = styled.div`
    display: flex;
    height: 100%;
`;

function App() {
    if (!isMobile)
        return (
            <AppContainer>
                <Menu />
                <MiscBoard />
                <FocusBoard />
                <TaskBoard />
            </AppContainer>
        );
    else {
        return (
            <AppContainer>
                <MobileView />
            </AppContainer>
        );
    }
}

export default App;
