import React from "react";
import { TaskBoard } from "./taskBoard/TaskBoard";
import { FocusBoard } from "./focusBoard/FocusBoard";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height:100%;
`;

function App() {
    return (
        <Container>
            <FocusBoard/>
            <TaskBoard />
        </Container>
    );
}

export default App;
