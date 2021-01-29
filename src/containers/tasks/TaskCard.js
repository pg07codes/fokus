import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { remove, update, tick, reset, toggleIsRunning, toggleIsCompleted, rearrange } from "./tasksSlice";
import useTimer from "../../hooks/useTimer";
import styled from "styled-components";
import { AiFillPlayCircle, AiFillPauseCircle, AiFillCheckCircle, AiOutlineCheckCircle, AiFillClockCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { GrPowerReset } from "react-icons/gr";
import { Flipped } from "react-flip-toolkit";

function formattedTimeString(x) {
    let seconds = x % 60;
    let minutes = Math.floor(x / 60);

    if (seconds == 0) {
        seconds = `00`;
    } else if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (minutes == 0) {
        minutes = `00`;
    } else if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${minutes}:${seconds}`;
}

const TaskCardDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 120px;
    width: 476px;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    background: #f8f8ff;
    margin: 10px;
`;

const TaskDetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100px;
    width: 280px;
    margin: 0 0 0 10px;
    border-radius: 20px;
    h3,
    p {
        margin: 2px;
        padding: 0;
    }
    p {
        font-size: 0.6rem;
        font-style: italic;
        color: grey;
    }
`;

const TaskTimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    border-radius: 10px;
    background-color: #eeeeff;
    position: relative;
`;

const TaskControllerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    width: 40px;
    border-radius: 0 10px 10px 0;
`;

export default function TaskCard({task , forwardRBDProvided}) {
    const delay = 1000;
    const dispatch = useDispatch();
    useTimer(
        () => {
            if (task.remainingTime > 0) {
                dispatch(tick(task.id));
            } else if (task.remainingTime === 0) {
                dispatch(toggleIsRunning(task.id));
            }
        },
        task.isRunning ? delay : null
    );

    const [taskEdit, setTaskEdit] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task.content);

    return (
        <Flipped flipId={`${task.id}`}>
            <TaskCardDiv  ref={forwardRBDProvided.innerRef} {...forwardRBDProvided.draggableProps} {...forwardRBDProvided.dragHandleProps}>
                <TaskDetailsDiv>
                    <p>
                        <AiFillClockCircle />
                        {Math.round(task.time / 60) + "min"}
                    </p>
                    {taskEdit ? (
                        <input
                            value={updatedTask}
                            onBlur={() => {
                                dispatch(update({ id: task.id, updatedTask }));
                                setTaskEdit(false);
                            }}
                            onChange={(e) => setUpdatedTask(e.target.value)}
                        />
                    ) : (
                        <h3 onDoubleClick={() => setTaskEdit(true)}>{task.globalKey+": "+task.content}</h3>
                    )}

                    <p>{`created at: ${new Date(task.createdAt).getHours()}:${new Date(task.createdAt).getMinutes()}`}</p>
                </TaskDetailsDiv>
                <TaskTimerDiv>
                    <h2>{formattedTimeString(task.remainingTime)}</h2>
                    <GrPowerReset style={{ position: "absolute", bottom: 5, right: 5, fontSize: "0.8rem" }} onClick={() => dispatch(reset(task.id))} />
                </TaskTimerDiv>

                <TaskControllerDiv style={{ fontSize: "1.5rem" }}>
                    {task.isCompleted ? (
                        <AiFillCheckCircle onClick={() => {dispatch(toggleIsCompleted(task.id));dispatch(rearrange({id:task.id,markedAsComplete:false}))}} />
                    ) : (
                        <AiOutlineCheckCircle onClick={() => {dispatch(toggleIsCompleted(task.id));dispatch(rearrange({id:task.id,markedAsComplete:true}))}} />
                    )}
                    {task.isRunning ? (
                        <AiFillPauseCircle onClick={() => dispatch(toggleIsRunning(task.id))} />
                    ) : (
                        <AiFillPlayCircle onClick={() => dispatch(toggleIsRunning(task.id))} />
                    )}

                    <TiDelete onClick={() => dispatch(remove(task.id))} />
                </TaskControllerDiv>
            </TaskCardDiv>
            </Flipped>
    );
}
