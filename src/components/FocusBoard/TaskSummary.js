import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "rc-progress";

const TaskSummaryDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius:10px;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
`;

const SummaryDataContainer = styled.div`
    display: flex;
    /* justify-content: space-evenly; */
    align-items: center;
    width: 90%;
    height: 60%;
    /* background-color: #f5f5fa; */
`;

const ColorDot = styled.div`
    width: 18px;
    height: 18px;
    background-color: ${(p) => p.color};
    border-radius: 50%;
    margin-right: 10px;
`;

const SummaryDataDiv = styled.div`
    display: flex;
    align-items: center;
    width: 40%;
    margin-top: 5px;
    margin-left: 3px;
    /* background-color: #c1c1c1; */
    p {
        font-size: 1.2em;
        font-weight: bold;
        margin: 0;
        margin-right: 3px;
    }
    span {
        font-size: 0.5em;
    }
`;

const CompletionPercentContainer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 5px;
    right: 15px;
    p {
        font-weight: bold;
    }
    span {
        font-size: 0.5em;
    }
`;

export function TaskSummary() {
    const completedTasksCount = useSelector((s) => s.tasks.meta.completedTasksCount);
    const totalTasksCount = useSelector((s) => s.tasks.taskArray.length);
    let completionPercent = totalTasksCount !== 0 ? Math.floor((completedTasksCount / totalTasksCount) * 100) : 100;
    return (
        <TaskSummaryDiv>
            <SummaryDataContainer>
                <SummaryDataDiv>
                    <ColorDot color={"#0000cd"} />
                    <p>{completedTasksCount}</p>
                    <span>done</span>
                </SummaryDataDiv>
                <SummaryDataDiv>
                    <ColorDot color={"#c1c1d7"} />
                    <p>{totalTasksCount}</p>
                    <span>tasks</span>
                </SummaryDataDiv>
                <CompletionPercentContainer>
                    <p>{completionPercent}</p>
                    <span>%</span>
                </CompletionPercentContainer>
            </SummaryDataContainer>
            <div style={{ width: "90%" }}>
                <Line percent={completionPercent} strokeWidth="5" trailWidth="5" trailColor="#C1C1D7" strokeColor="#0000CD" />
            </div>
        </TaskSummaryDiv>
    );
}
