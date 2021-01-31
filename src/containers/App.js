import React from "react";
import { Task } from "./tasks";
import { FocusBoard } from "./focusBoard";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height:100%;
`;

function App() {
    return (
        <Container>
            <FocusBoard/>
            <Task />
        </Container>
    );
}

export default App;
