import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {SummaryCardTick} from "./../customIcons";


const ProgressCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position:relative;
    width: 90%;
    height: 40%;
    border-radius: 10px;
    border-left: 8px solid #ffce73;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    /* background-color: #f8effa; */
`;

const ProgressCardText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 85%;
    height: 45%;
    /* background-color: #d1effa; */
    font-weight: bold;
    p {
        font-size: 1.6em;
        margin: 0;
    }
    span {
        font-size: 0.6em;
    }
`;

const TickIconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 25px;
    height: 25px;
    top: 5px;
    right: 5px;
    svg {
        color: #0000cd;
    }
`;


export function TaskProgressCard() {
    const completedTasksCount = useSelector((s) => s.tasks.meta.completedTasksCount);
    const totalTasksCount = useSelector((s) => s.tasks.taskArray.length);

    return (
        <ProgressCard>
            <ProgressCardText>
                <p>{completedTasksCount}</p>
                <span>done tasks</span>
            </ProgressCardText>
            <ProgressCardText>
                <p>{totalTasksCount}</p>
                <span>total tasks</span>
            </ProgressCardText>
            <TickIconDiv>
                <SummaryCardTick/>
            </TickIconDiv>
        </ProgressCard>
    );
}
