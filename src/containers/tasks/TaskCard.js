import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { remove, update, tick, reset, toggleIsRunning, toggleIsCompleted, rearrange } from "./tasksSlice";
import { focusOnTask } from "./../focusBoard/focusBoardSlice";
import useTimer from "../../hooks/useTimer";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { ImLoop2, ImCancelCircle } from "react-icons/im";
import { Flipped } from "react-flip-toolkit";
import { GrDrag } from "react-icons/gr";

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

const TaskCardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 576px;
    height: 140px;
    margin: 15px;
    /* background-color: #fff4e1; */
`;

const TaskCardDragIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 30px;
    height: 100%;
    /* background-color: #ff09ac; */
    svg {
        cursor: url("https://ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur"), default !important;
        font-size: 2em;
        opacity: 0.6;
    }
`;

const TaskCardDiv = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    height: 100%;
    width: 520px;
    border-radius: 5px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    background: #fff;
    border: 2px solid black;
`;

const TaskDetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 75%;
    margin: 0 0 0 10px;
    /* background-color: #fffcec; */
    h3,
    p {
        margin: 5px 0 15px 0;
    }
`;

const TaskContentDiv = styled.div`
    display: flex;
    align-items: center;
    height: 65%;
    margin: 0 0 0 5px;
    /* background-color: #fffcec; */
    h3,
    p {
        margin: 5px 0 15px 0;
    }
`;

const TaskTimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 20%;
    /* background-color: #f8f8ff; */
    position: relative;
    p {
        margin: 5px;
        font-size: 1em;
    }
    svg {
        font-size: 2.5em;
        margin-top: 15px;
    }
`;
const TaskTimeDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80%;
    width: 120px;
`;
const TaskTimeButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 85px;
    border-radius: 5px;
    border: 1px solid black;
    margin: 5px;
    cursor: pointer;
    background-color: #fff;
    color: #000;
    p {
        margin: 0;
        font-size: 0.7em;
    }
`;

const TaskDoneButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 70px;
    border-radius: 5px;
    border: 1px solid black;
    margin: 5px;
    cursor: pointer;
    background-color: ${(props) => (props.isCompleted ? "#000" : "#fff")};
    color: ${(props) => (props.isCompleted ? "#fff" : "#000")};
    p {
        margin: 0;
        font-size: 0.7em;
    }
`;

const TaskDeleteButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 80px;
    border-radius: 5px;
    border: 1px solid black;
    margin: 5px;
    cursor: pointer;
    background-color: #fff;
    margin-left: auto;
    color: #000;
    p {
        margin: 0;
        font-size: 0.7em;
    }
    &:hover {
        background-color: #000;
        color: #fff;
    }
`;

const TaskControllerDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 25%;
    /* background-color: #fffa91; */
    svg {
        font-size: 20px;
        margin: 5px;
    }
`;

function previewTask(str) {
    if (str.length <= 70) return str;
    else return str.substring(0, 70) + "...";
}

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
    const [showDragIcon, setShowDragIcon] = useState(false);

    return (
        <Flipped flipId={`${task.id}`}>
            <TaskCardContainer
                ref={forwardRBDProvided.innerRef}
                {...forwardRBDProvided.draggableProps}
                {...forwardRBDProvided.dragHandleProps}
                onMouseEnter={() => setShowDragIcon(true)}
                onMouseLeave={() => setShowDragIcon(false)}
            >
                <TaskCardDragIcon>{showDragIcon && <GrDrag />}</TaskCardDragIcon>

                <TaskCardDiv onClick={() => dispatch(focusOnTask(task))}>
                    <TaskTimerDiv>
                        <FiClock onClick={() => dispatch(toggleIsRunning(task.id))} />
                        <p>{formattedTimeString(task.remainingTime)}</p>
                    </TaskTimerDiv>

                    <TaskDetailsDiv>
                        <TaskContentDiv>
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
                                <h3 onDoubleClick={() => setTaskEdit(true)}>{previewTask(task.content)}</h3>
                            )}
                        </TaskContentDiv>

                        <TaskControllerDiv>
                            <TaskDoneButton
                                isCompleted={task.isCompleted}
                                onClick={
                                    task.isCompleted
                                        ? () => {
                                              dispatch(toggleIsCompleted(task.id));
                                              dispatch(rearrange({ id: task.id, markedAsComplete: false }));
                                          }
                                        : () => {
                                              dispatch(toggleIsCompleted(task.id));
                                              dispatch(rearrange({ id: task.id, markedAsComplete: true }));
                                          }
                                }
                            >
                                <BsCheckCircle />
                                <p>Done</p>
                            </TaskDoneButton>
                            <TaskTimeDiv>
                                <TaskTimeButton>
                                    <AiOutlineClockCircle />
                                    <p>{Math.round(task.time / 60) + "mins"}</p>
                                </TaskTimeButton>
                                <ImLoop2 onClick={() => dispatch(reset(task.id))} />
                            </TaskTimeDiv>

                            <TaskDeleteButton onClick={() => dispatch(remove(task.id))}>
                                <ImCancelCircle />
                                <p>Delete</p>
                            </TaskDeleteButton>
                        </TaskControllerDiv>
                    </TaskDetailsDiv>
                </TaskCardDiv>
            </TaskCardContainer>
        </Flipped>
    );
}
