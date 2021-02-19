import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create, incrementGlobalKey, focusOnTask, updateLabelCount } from "./../../containers/taskBoard/taskBoardSlice";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillClockCircle } from "react-icons/ai";

const TaskInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    width: 90%;
    border-radius: 10px;
    background-color: #fff;
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
        color: #FABB18;
    }
`;

const TaskContentInputField = styled.input`
    height: 100%;
    width: 90%;
    font-size: 0.9em;
    background-color: #fff;
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
        color: #FABB18;
    }
`;

const TaskTimeInputField = styled.input`
    height: 100%;
    width: 30%;
    font-size: 0.9em;
    text-align: center;
    background-color: #fff;
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
`;

export default function TaskInput() {
    const [task, setTask] = useState("");
    const [time, setTime] = useState(20);
    let taskContentInputRef, taskTimeInputRef;
    const meta = useSelector((s) => s.tasks.meta);
    const labels = useSelector((s) => s.tasks.labels);
    const dispatch = useDispatch();

    function submitTask(e) {
        if (e.key === "Enter" && task.trim().length >= 1) {
            let temp = task.trim().split(" ");
            // add a max time limit
            let taskTime = time;
            let label = null;
            if (temp.length !== 1) {
                if (!isNaN(parseInt(temp[temp.length - 1]))) {
                    taskTime = parseInt(temp.pop());
                } else if (temp[temp.length - 1][0] === "#" && temp[temp.length - 1].length > 1 && "wpfmeWPFME".includes(temp[temp.length - 1][1])) {
                    let userLabel = temp[temp.length - 1].substring(1).toLowerCase();
                    let found = false;
                    for (let validLabel in labels) {
                        found = validLabel.includes(userLabel);
                        console.log(userLabel,validLabel)
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
                time: taskTime * 60,
                remainingTime: taskTime * 60,
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
            setTime(20);
            taskContentInputRef.value = "";
            taskTimeInputRef.value = "";
            taskContentInputRef.focus();
        }
    }

    return (
        <TaskInputContainer>
            <TaskContentInputDiv>
                <AiFillPlusCircle onClick={() => taskContentInputRef.focus()} />
                <TaskContentInputField
                    type="text"
                    placeholder="i have to focus on ..."
                    ref={(el) => (taskContentInputRef = el)}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={submitTask}
                />
            </TaskContentInputDiv>
            <TaskTimeInputDiv>
                <AiFillClockCircle onClick={() => taskTimeInputRef.focus()} />
                <TaskTimeInputField
                    type="number"
                    placeholder="20"
                    ref={(el) => (taskTimeInputRef = el)}
                    onChange={(e) => setTime(e.target.value)}
                    onKeyDown={submitTask}
                />
                <span>mins</span>
            </TaskTimeInputDiv>
        </TaskInputContainer>
    );
}
