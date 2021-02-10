import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create, incrementGlobalKey, focusOnTask } from "./../../containers/taskBoard/taskBoardSlice";
import styled from "styled-components";
import { AiFillPlusCircle,  AiFillClockCircle } from "react-icons/ai";

const TaskInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    width: 420px;
    border-radius: 10px;
    background-color: #fff;
    height: 50px;
    -webkit-box-shadow:0  5px 10px rgba(166,173,201,0.2);
    box-shadow:0  5px 10px rgba(166,173,201,0.2);
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
        color: #000;
    }
`;

const TaskContentInputField = styled.input`
    height: 100%;
    width: 90%;
    font-size: 0.9em;
    background-color: #fff;
    border: 0;
    outline: none;
    &::placeholder{
        color:#777672;
        /* font-weight:bold; */
    }
`;

const TaskTimeInputDiv = styled.div`
    display: flex;
    align-items: center;
    height: 90%;
    width: 25%;
    color: #777672;
    span {
        font-size: 0.8em;
        /* font-weight:bold; */
    }
    svg {
        font-size:1.2em;
        color: #000;
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
    &::placeholder{
        color:#777672;
        /* font-weight:bold; */
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
    const meta = useSelector((state) => state.tasks.meta);
    const dispatch = useDispatch();

    function submitTask(e) {
        if (e.key === "Enter" && task.trim().length >= 1) {
            let temp = task.trim().split(" ");
            // add a max time limit
            let taskTime = time;
            if (temp.length !== 1 && !isNaN(parseInt(temp[temp.length - 1]))) {
                taskTime = parseInt(temp.pop());
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
            };
            if (meta.focussedTaskIndex !== -1) dispatch(focusOnTask(meta.focussedTaskIndex + 1));
            dispatch(create(newTask));
            dispatch(incrementGlobalKey());
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
                <AiFillPlusCircle onClick={()=>taskContentInputRef.focus()} />
                <TaskContentInputField
                    type="text"
                    placeholder="i have to focus on ..."
                    ref={(el) => (taskContentInputRef = el)}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={submitTask}
                />
            </TaskContentInputDiv>
            <TaskTimeInputDiv>
                <AiFillClockCircle onClick={()=>taskTimeInputRef.focus()}/>
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
