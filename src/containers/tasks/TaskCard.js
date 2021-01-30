import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { remove, update, tick, reset, toggleIsRunning, toggleIsCompleted, rearrange } from "./tasksSlice";
import useTimer from "../../hooks/useTimer";
import styled from "styled-components";
import { AiFillPlayCircle, AiFillPauseCircle, AiFillCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { BsCheckCircle, BsClockFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
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
    height: 150px;
    width: 576px;
    border-radius: 5px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    background: #fff;
    margin: 10px;
    border: 2px solid black;
`;

const TaskDetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 140px;
    width: 400px;
    margin: 0 0 0 10px;
    /* background-color: #fffcec; */
    h1,
    p {
        margin:15px 0 15px 0;
    }
`;

const TaskTimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 120px;
    width: 100px;
    /* background-color: #f8f8ff; */
    position: relative;
    p {
        margin: 3px;
    }
    svg {
        margin-top: 7px;
    }
`;

const TaskTimeButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 70px;
    border-radius: 5px;
    background-color: #000;
    color: white;
    p {
        margin: 3px;
        font-size: 6px;
        font-weight: bold;
    }
    svg {
        font-size: 16px;
    }
`;

const TaskDoneButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 70px;
    border-radius: 5px;
    border:1px solid black;
    background-color: ${(props)=>props.isCompleted?"#000":"#fff"};
    color: ${(props)=>props.isCompleted?"#fff":"#000"}; 
    cursor:pointer;
    p {
        margin: 3px;
        font-size: 8px;
        font-weight: bold;
    }
    svg {
        font-size: 18px;
    }
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

export default function TaskCard({ task, forwardRBDProvided }) {
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
            <TaskCardDiv ref={forwardRBDProvided.innerRef} {...forwardRBDProvided.draggableProps} {...forwardRBDProvided.dragHandleProps}>
                <TaskTimerDiv>
                    <BsClockFill style={{ fontSize: "50px" }} />
                    <p>{formattedTimeString(task.remainingTime)}</p>
                    {/* <GrPowerReset style={{ position: "absolute", bottom: 5, right: 5, fontSize: "0.8rem" }} onClick={() => dispatch(reset(task.id))} /> */}
                </TaskTimerDiv>

                <TaskDetailsDiv>
                    <TaskTimeButton>
                        <AiOutlineClockCircle />
                        <p>{Math.round(task.time / 60) + "mins"}</p>
                    </TaskTimeButton>

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
                        <h1 onDoubleClick={() => setTaskEdit(true)}>{task.content}</h1>
                    )}

                    <TaskDoneButton isCompleted={task.isCompleted} onClick={task.isCompleted?(() => {
                                dispatch(toggleIsCompleted(task.id));
                                dispatch(rearrange({ id: task.id, markedAsComplete: false }));
                            }):(() => {
                                dispatch(toggleIsCompleted(task.id));
                                dispatch(rearrange({ id: task.id, markedAsComplete: true }));
                            })}>
                        <BsCheckCircle/>
                        <p>Done</p>
                    </TaskDoneButton>
                </TaskDetailsDiv>

                <TaskControllerDiv style={{ fontSize: "1.5rem" }}>
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
