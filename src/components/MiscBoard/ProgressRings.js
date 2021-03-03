import React from "react";
import { useSelector } from "react-redux";
import { buildStyles, CircularProgressbarWithChildren, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const ProgressRingBox = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ProgressRingDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 55%;
    /* background-color:#afa1d1; */
`;

const ProgressRingLegendDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: 30%;
    /* background-color: cyan; */
    color: #FABB18;
    font-weight: bold;
    p {
        margin: 3px 0;
        font-size: 0.9em;
        letter-spacing: 2;
    }
`;

const LegendDataDiv = styled.div`
    display: flex;
    align-items: center;
    width: 95%;
    /* background-color: #fdadef; */
    margin: 4px 0;
    color:${p=>p.theme.primaryText};
`;

const TextDiv = styled.div`
    font-weight: bold;
    font-size: 0.8em;
    p {
        margin: 0 3px;
    }
`;

const PercentTextDiv = styled.div`
    font-weight: bold;
    font-size: 0.7em;
    margin-left: auto;
    color:${p=>p.theme.primaryText};
`;

const LegendColorDot = styled.div`
    width: 10px;
    height: 10px;
    background-color: ${(p) => p.color};
    border-radius: 50%;
`;

export function ProgressRings() {
    const completedTasksCount = useSelector((s) => s.tasks.meta.completedTasksCount);
    const totalTasksCount = useSelector((s) => s.tasks.taskArray.length);
    let taskCompletionPercent = totalTasksCount !== 0 ? Math.floor((completedTasksCount / totalTasksCount) * 100) : 100;

    const remainingTaskListTime = useSelector((s) => s.tasks.meta.remainingTaskListTime);
    const totalTaskListTime = useSelector((s) => s.tasks.meta.totalTaskListTime);
    let timeCompletionPercent = totalTaskListTime !== 0 ? Math.floor(((totalTaskListTime - remainingTaskListTime) / totalTaskListTime) * 100) : 100;

    return (
        <ProgressRingBox>
            <ProgressRingDiv>
                <div style={{ width: 115, height: 115 }}>
                    <CircularProgressbarWithChildren
                        value={taskCompletionPercent}
                        styles={buildStyles({
                            pathColor: "#77dd77",
                            trailColor: "#FFE39E",
                        })}
                        strokeWidth={11}
                    >
                        <div style={{ width: 75, height: 75 }}>
                            <CircularProgressbar
                                value={timeCompletionPercent}
                                styles={buildStyles({
                                    pathColor: "#0000cd",
                                    trailColor: "#FFE39E",
                                })}
                                strokeWidth={16}
                            />
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            </ProgressRingDiv>
            <ProgressRingLegendDiv>
                <p>Progress</p>
                <LegendDataDiv>
                    <LegendColorDot color="#77dd77" />
                    <TextDiv>
                        <p>
                            tasks
                        </p>
                    </TextDiv>

                    <PercentTextDiv>
                        <span>{totalTasksCount===0? "--":`${taskCompletionPercent}%`}</span>
                    </PercentTextDiv>
                </LegendDataDiv>
                <LegendDataDiv>
                    <LegendColorDot color="#0000cd" />
                    <TextDiv>
                        <p>time</p>
                    </TextDiv>
                    <PercentTextDiv>
                    <span>{totalTasksCount===0? "--":`${timeCompletionPercent}%`}</span>
                    </PercentTextDiv>
                </LegendDataDiv>
            </ProgressRingLegendDiv>
        </ProgressRingBox>
    );
}
