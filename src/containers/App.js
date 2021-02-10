import React from "react";
import { TaskBoard } from "./taskBoard/TaskBoard";
import { FocusBoard } from "./focusBoard/FocusBoard";
import { Menu } from "./menu/Menu";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height:100%;
`;

function App() {
    return (
        <Container>
            <Menu/>
            <FocusBoard/>
            <TaskBoard />
        </Container>
    );
}

export default App;
