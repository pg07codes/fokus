import React from "react";
import styled from "styled-components";
import noTasks from "./../../images/noTasks.svg";
import ReactTooltip from "react-tooltip";

const NoTasksDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: ${(p)=>p.allCompleted?"40%":"70%"};
    margin: 30px 10px;
`;

const NoTasksIcon = styled.div`
    img {
        width: 90%;
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
        <NoTasksDiv allCompleted={allCompleted}>
            <NoTasksIcon data-tip="" data-for="taskIcon">
                <img src={noTasks} alt={"No Tasks"} />
                <ReactTooltip id="taskIcon" getContent={()=>allCompleted ? "create more tasks" : "create task to begin"} />
            </NoTasksIcon>
        </NoTasksDiv>
    );
}
