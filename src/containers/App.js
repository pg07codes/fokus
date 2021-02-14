import React from "react";
import { TaskBoard } from "./taskBoard/TaskBoard";
import { FocusBoard } from "./focusBoard/FocusBoard";
import { MiscBoard }  from "./miscBoard/MiscBoard";
import { Menu } from "./menu/Menu";
import styled from "styled-components";

const AppContainer = styled.div`
    display: flex;
    height:100%;
`;

function App() {
    return (
        <AppContainer>
            <Menu/>
            <MiscBoard/>
            <FocusBoard/>
            <TaskBoard />
        </AppContainer>
    );
}

export default App;
