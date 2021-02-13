import React from "react";
import styled from "styled-components";
import tasksDone from "./../../images/tasksDone.svg";

const NoTasksDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 246px;
    min-height: 140px;
    background-color: #fff;
    border-radius: 10px;
    margin: 20px;
    -webkit-box-shadow: 0 3px 6px rgba(166, 173, 201, 0.2);
    box-shadow: 0 3px 6px rgba(166, 173, 201, 0.2);
`;

const NoTasksIcon = styled.div`
    img {
        width: 60px;
    }
`;

const NoTasksText = styled.div`
    p {
        font-weight: bold;
        margin: 0;
        color: #c1c1d7;
    }
`;

export default function NoTasks({ allCompleted }) {
    return (
        <NoTasksDiv>
            <NoTasksIcon>
                <img src={tasksDone} alt={"Tasks Done"} />
            </NoTasksIcon>
            <NoTasksText>{allCompleted ? <p>create some more tasks</p> : <p>create a new task</p>}</NoTasksText>
        </NoTasksDiv>
    );
}
