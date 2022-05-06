import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create, incrementGlobalKey, focusOnTask, updateLabelCount } from "./../../containers/taskBoard/taskBoardSlice";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillClockCircle } from "react-icons/ai";
import { TaskFeedback } from "./TaskFeedback";
import { debounce } from "../../helpers";

const TaskInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 10px 0;
    width: 90%;
    max-width: 396px;
    border-radius: 10px;
    background-color: ${(p) => p.theme.backgroundSecondary};
    height: 50px;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.3);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.3);
`;

const TaskContentInputDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90%;
    width: 70%;
    margin-left: 10px;
    svg {
        font-size: 1.3em;
        margin-right: 5px;
        color: #fabb18;
    }
`;

const TaskContentInputField = styled.input`
    height: 100%;
    width: 90%;
    font-size: 0.9em;
    background-color: ${(p) => p.theme.backgroundSecondary};
    color: ${(p) => p.theme.primaryText};
    border: 0;
    outline: none;
    font-weight: bold;
    &::placeholder {
        color: #c1c1d7;
    }
`;

const TaskTimeInputDiv = styled.div`
    display: flex;
    align-items: center;
    height: 90%;
    width: 25%;
    color: #c1c1d7;
    span {
        font-size: 0.7em;
        font-weight: bold;
    }
    svg {
        font-size: 1.2em;
        color: #fabb18;
    }
`;

const TaskTimeInputField = styled.input`
    height: 100%;
    width: 30%;
    font-size: 0.9em;
    text-align: center;
    background-color: ${(p) => p.theme.backgroundSecondary};
    color: ${(p) => p.theme.primaryText};
    border: 0;
    outline: none;
    font-weight: bold;
    &::placeholder {
        color: #c1c1d7;
    }
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
    }
        input[type="number"] { 
        -moz-appearance: textfield;   
    }
`;

export default function TaskInput() {

    const defaultTime = useSelector((s) => s.settings.defaultTime);
    const defaultLabel = useSelector((s) => s.settings.defaultLabel);

    const [task, setTask] = useState("");
    const [time, setTime] = useState(defaultTime);

    const [generateFeedbackForTask, setGenerateFeedbackForTask] = useState(undefined);
    const [generateFeedbackForTime, setGenerateFeedbackForTime] = useState(undefined);
    const [isInputValid,setInputValid] = useState(false);

    let taskContentInputRef, taskTimeInputRef;
    const meta = useSelector((s) => s.tasks.meta);
    const labels = useSelector((s) => s.tasks.labels);
    const dispatch = useDispatch();

    function submitTask(e) {
        if (e.key === "Enter" && task.trim().length >= 1 && isInputValid) {
            let temp = task.trim().split(" ");
            // add a max time limit
            let taskTime = time;
            let label = defaultLabel;
            if (temp.length !== 1) {
                if (!isNaN(parseInt(temp[temp.length - 1]))) {
                    taskTime = parseInt(temp.pop());
                } else if (temp[temp.length - 1][0] === "#" && temp[temp.length - 1].length > 1 && "wpfmeWPFME".includes(temp[temp.length - 1][1])) {
                    let userLabel = temp[temp.length - 1].substring(1).toLowerCase();
                    let found = false;
                    for (let validLabel in labels) {
                        found = validLabel.includes(userLabel);
                        console.log(userLabel, validLabel);
                        if (found) {
                            label = validLabel;
                            temp.pop();
                            break;
                        }
                    }
                }
            }

            temp = temp.join(" ");
            let newTask = {
                id: Math.floor(Math.random() * 10000),
                globalKey: meta.globalKey,
                content: temp,
                time: taskTime,
                remainingTime: taskTime,
                isRunning: false,
                isCompleted: false,
                createdAt: new Date().toISOString(),
                label: label,
            };
            if (meta.focussedTaskIndex !== -1) dispatch(focusOnTask(meta.focussedTaskIndex + 1));
            dispatch(create(newTask));
            dispatch(incrementGlobalKey());
            if (label !== null) dispatch(updateLabelCount({ oldLabel: null, newLabel: label }));
            setTask("");
            setTime(defaultTime);
            taskContentInputRef.value = "";
            taskTimeInputRef.value = "";
            taskContentInputRef.focus();
        }
    }

    const debouncedGenerateInputFeedback = useCallback(
        debounce((task, time) => {
            if (task !== undefined) setGenerateFeedbackForTask(task);
            if (time !== undefined) setGenerateFeedbackForTime(time);
        }, 150),
        []
    );

    function onTaskInputChangeHandler(task) {
        setTask(task);
        debouncedGenerateInputFeedback(task, undefined);
    }

    function onTimeInputChangeHandler(time) {
        setTime(time);
        debouncedGenerateInputFeedback(undefined, time);
    }

    // improve logic - both onKeyDown and onChange executing - combining will be better.
    return (
        <>
            <TaskInputContainer>
                <TaskContentInputDiv>
                    <AiFillPlusCircle onClick={() => taskContentInputRef.focus()} />
                    <TaskContentInputField
                        type="text"
                        placeholder="i have to focus on ..."
                        ref={(el) => (taskContentInputRef = el)}
                        onChange={(e) => onTaskInputChangeHandler(e.target.value)}
                        onKeyDown={submitTask}
                    />
                </TaskContentInputDiv>
                <TaskTimeInputDiv>
                    <AiFillClockCircle onClick={() => taskTimeInputRef.focus()} />
                    <TaskTimeInputField
                        type="number"
                        placeholder={defaultTime}
                        ref={(el) => (taskTimeInputRef = el)}
                        onChange={(e) => onTimeInputChangeHandler(e.target.value)}
                        onKeyDown={submitTask}
                    />
                    <span>mins</span>
                </TaskTimeInputDiv>
            </TaskInputContainer>
            <TaskFeedback task={generateFeedbackForTask} time={generateFeedbackForTime} setInputValid={setInputValid}/>
        </>
    );
}
