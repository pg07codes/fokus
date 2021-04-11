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
    color:${p=>p.theme.primaryText};
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
        let errorGenerated = false;
        if (task !== undefined) {
            // if time is there, it should be stripped and validated first before the actual task content
            let temp = task?.trim().split(" ");
            if (temp !== undefined && !isNaN(parseInt(temp[temp.length - 1]))) {
                let taskTime = parseInt(temp.pop());
                if (taskTime <= 0) {
                    setError("Hmmm. Time for this task seems weird,no?");
                    errorGenerated = true;
                    setInputValid(false);
                    return;
                } else if (taskTime > 120) {
                    setError("Time should be <120mins for better focus !");
                    errorGenerated = true;
                    setInputValid(false);
                    return;
                }
            }
            temp = temp?.join(" ");

            if (temp?.length === 0) {
                setError(undefined);
                errorGenerated = true;
                setInputValid(false);
            } else if (temp?.length < 3) {
                setError("Task should be atleast 3 characters long.");
                errorGenerated = true;
                setInputValid(false);
            } else if (temp?.length > 100) {
                setError("Hey, that's too long. Keep it short and simple.");
                errorGenerated = true;
                setInputValid(false);
            } else {
                setError(undefined);
                setInputValid(true);
            }
        }

        if (!errorGenerated) {
            // will check for error in time only if no error in task
            if (time !== undefined && time !== "") {
                let numericTime = parseInt(time);
                if (numericTime <= 0 || numericTime > 120) {
                    setError("Time should be between 1-120 mins");
                    setInputValid(false);
                } else {
                    setError(undefined);
                    setInputValid(true);
                }
            }
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
                        <p>Create New Task</p>
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
