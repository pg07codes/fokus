import React from "react";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "rc-progress";

const EmptyTaskSummaryDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
`;

const EmptySummaryTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    width: 90%;
    height: 60%;
    span{
        font-weight:bold;
        font-size:0.8em;
        color:#c1c1d7;
    }
`;

export function EmptyTaskSummary() {
    
    return (
        <EmptyTaskSummaryDiv>
            <EmptySummaryTextContainer>
                <span>create tasks and track summary</span>
            </EmptySummaryTextContainer>
            <div style={{ width: "90%" }}>
                <Line percent={70} strokeWidth="5" trailWidth="5" trailColor="#C1C1D7" strokeColor="#0000CD" />
            </div>
        </EmptyTaskSummaryDiv>
    );
}
