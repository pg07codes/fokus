import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getFormattedListTimeSummary } from "../../helpers";

const ProgressCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 45%;
    border-radius: 10px;
    border-left: 10px solid red;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    background-color: #f8effa;
`;

const ProgressCardText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: 45%;
    background-color: #d1effa;
    span {
        font-weight: bold;
        font-size: 0.6em;
    }
`;

const FormattedTimeDiv = styled.div`
    display: flex;
    align-items:center;
    p {
        margin: 0;
        font-weight: bold;
        font-size: 1.4em;
    }
    span {
        margin: 0 3px;
        font-size: 0.6em;
    }
`;

export function TimeProgressCard() {
    const totalTaskListTime = useSelector((state) => state.tasks.meta.totalTaskListTime);
    const remainingTaskListTime = useSelector((state) => state.tasks.meta.remainingTaskListTime);

    const rTLTObj = getFormattedListTimeSummary(remainingTaskListTime);
    let rTLTHours = rTLTObj.hours;
    let rTLTMins = rTLTObj.mins;

    const tTLTObj = getFormattedListTimeSummary(totalTaskListTime);
    let tTLTHours = tTLTObj.hours;
    let tTLTMins = tTLTObj.mins;
    return (
        <ProgressCard>
            <ProgressCardText>
                <FormattedTimeDiv>
                    <p>{rTLTHours}</p>
                    <span>h</span>
                    <p>{rTLTMins}</p>
                    <span>m</span>
                </FormattedTimeDiv>

                <span>remaining time</span>
            </ProgressCardText>
            <ProgressCardText>
                <FormattedTimeDiv>
                    <p>{tTLTHours}</p>
                    <span>h</span>
                    <p>{tTLTMins}</p>
                    <span>m</span>
                </FormattedTimeDiv>
                <span>total time</span>
            </ProgressCardText>
        </ProgressCard>
    );
}
