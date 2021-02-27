import React from "react";
import styled , {css} from "styled-components";
import { useSelector } from "react-redux";
import { getFormattedListTimeSummary } from "../../helpers";
import { SummaryCardClock } from "./../customIcons";

const ProgressCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    width: 95%;
    height: 45%;
    border-radius: 10px;
    border-left: 8px solid #0000cd;
    /* -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4); */
    background-color: #f0f8ff;
`;

const ProgressCardText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 85%;
    height: 45%;
    /* background-color: #d1effa; */
    span {
        color: #4a4b46;
        font-weight: bold;
        font-size: 0.6em;
    }
`;

const FormattedTimeDiv = styled.div`
    display: flex;
    align-items: center;
    p {
        margin: 0;
        font-weight: bold;
        font-size: 1.2em;
    }
    span {
        margin: 0 3px;
        font-size: 0.6em;
    }
`;

const absoluteIconStyles = css`
    position: absolute;
    top: 5px;
    right: 5px;
`;

const ClockIconDiv = styled.div`
    width:${(p) => (p.noTasks ? "45%" : "25px")};
    ${(p) => (p.noTasks ? "" : absoluteIconStyles)}
    svg {
        color: #0000cd;
        opacity: ${(p) => (p.noTasks ? "0.7" : 1)};
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
            {totalTaskListTime !== 0 && (
                <>
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
                </>
            )}
            <ClockIconDiv noTasks={totalTaskListTime === 0}>
                <SummaryCardClock />
            </ClockIconDiv>
        </ProgressCard>
    );
}
