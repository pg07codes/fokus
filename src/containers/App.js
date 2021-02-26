import React from "react";
import { Menu } from "./menu/Menu";
import Dashboard from "./dashboard";
import { TaskBoard } from "./taskBoard/TaskBoard";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { MobileView } from "./mobileView";

const AppContainer = styled.div`
    display: flex;
    height: 100%;
`;

function App() {
    if (!isMobile)
        return (
            <AppContainer>
                <Menu />
                <Dashboard />
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
