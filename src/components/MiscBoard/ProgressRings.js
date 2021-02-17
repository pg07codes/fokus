import React from "react";
import { useSelector } from "react-redux";
import { buildStyles, CircularProgressbarWithChildren, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const ProgressRingBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ProgressRingDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 80%;
    /* background-color:#afa1d1; */
`;

const ProgressRingLegendDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 45%;
    height: 80%;
    /* background-color: #1fadef; */
    color: #c1c1d7;
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
    color: #000;
`;

const TextDiv = styled.div`
    font-weight: bold;
    font-size: 0.8em;
    p {
        margin: 0 5px;
    }
`;
const PercentTextDiv = styled.div`
    font-weight: bold;
    font-size: 0.8em;
    margin-left: auto;
    color: #c1c1d7;
`;

const LegendColorDot = styled.div`
    width: 12px;
    height: 12px;
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
                <div style={{ width: 130, height: 130 }}>
                    <CircularProgressbarWithChildren
                        value={taskCompletionPercent}
                        styles={buildStyles({
                            pathColor: "#ffce73",
                            trailColor: "#c1c1d7",
                        })}
                        strokeWidth={10}
                    >
                        <div style={{ width: 90, height: 90 }}>
                            <CircularProgressbar
                                value={timeCompletionPercent}
                                styles={buildStyles({
                                    pathColor: "#76ff7a",
                                    trailColor: "#c1c1d7",
                                })}
                                strokeWidth={14}
                            />
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            </ProgressRingDiv>
            <ProgressRingLegendDiv>
                <p>Progress</p>
                <LegendDataDiv>
                    <LegendColorDot color="#ffce73" />
                    <TextDiv>
                        <p>
                            tasks
                        </p>
                    </TextDiv>

                    <PercentTextDiv>
                        <span>{taskCompletionPercent}%</span>
                    </PercentTextDiv>
                </LegendDataDiv>
                <LegendDataDiv>
                    <LegendColorDot color="#76ff7a" />
                    <TextDiv>
                        <p>time</p>
                    </TextDiv>
                    <PercentTextDiv>
                        <span>{timeCompletionPercent}%</span>
                    </PercentTextDiv>
                </LegendDataDiv>
            </ProgressRingLegendDiv>
        </ProgressRingBox>
    );
}
