import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { debounce, getFormattedListTimeSummary } from "../../helpers";
import { FaClock } from "react-icons/fa";

const TaskFeedbackContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 0 10px 0;
`;

const RemainingTaskListTimeDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        margin: 0 3px;
        font-weight: bold;
        font-size: 0.8em;
    }
    svg {
        font-size: 0.8em;
        margin: 0 3px;
    }
    span {
        margin: 0 2px;
        font-size: 0.8em;
    }
`;

const ErrorMessage = styled.div`
    display: flex;
    align-items: center;
    color: red;
    p {
        margin: 0;
        font-size: 0.8em;
    }
`;

export function TaskFeedback({ task, time, setInputValid }) {
    let [error, setError] = useState(undefined);

    useEffect(() => {
        // if time is there, it should be stripped and validated first before the actual task content
        let temp = task?.trim().split(" ");
        if (temp !== undefined && !isNaN(parseInt(temp[temp.length - 1]))) {
            let taskTime = parseInt(temp.pop());
            if (taskTime <= 0 || taskTime > 120) {
                setError("Time should be between 0-120 mins");
                setInputValid(false);
                return;
            }
        }
        temp = temp?.join(" ");

        if (temp?.length === 0) {
            setError(undefined);
            setInputValid(false);
        } else if (temp?.length < 3) {
            setError("Task cannot be smaller than 3 characters");
            setInputValid(false);
        } else if (temp?.length > 100) {
            setError("Task cannot be greater than 100 characters");
            setInputValid(false);
        } else {
            setError(undefined);
            setInputValid(true);
        }
    }, [task, time, setInputValid]);

    const remainingTaskListTime = useSelector((s) => s.tasks.meta.remainingTaskListTime);
    const rTLTObj = getFormattedListTimeSummary(remainingTaskListTime);
    let rTLTHours = rTLTObj.hours;
    let rTLTMins = rTLTObj.mins;

    return (
        <TaskFeedbackContainer>
            {error === undefined ? (
                <RemainingTaskListTimeDiv>
                    {remainingTaskListTime === 0 ? (
                        <p>Create New Tasks</p>
                    ) : (
                        <>
                            <FaClock />
                            <p>list time:</p>
                            {rTLTHours !== "0" && <span>{rTLTHours}h</span>}
                            {rTLTMins !== "00" && <span>{rTLTMins}m</span>}
                        </>
                    )}
                </RemainingTaskListTimeDiv>
            ) : (
                <ErrorMessage>
                    <p>{error}</p>
                </ErrorMessage>
            )}
        </TaskFeedbackContainer>
    );
}
