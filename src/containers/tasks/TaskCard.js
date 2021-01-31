import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { remove, update, tick, reset, toggleIsRunning, toggleIsCompleted, rearrange } from "./tasksSlice";
import { focusOnTask } from "./../focusBoard/focusBoardSlice";
import useTimer from "../../hooks/useTimer";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCheckCircle, BsClockFill } from "react-icons/bs";
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
    width: 600px;
    height: 150px;
    margin: 10px;
    /* background-color: #fff4e1; */
`;

const TaskCardDragIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 30px;
    height: 100%;
    /* background-color: #fff9ac; */
    svg {
        cursor: url("https://ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur"), default !important;
        font-size: 24px;
        opacity: 0.6;
    }
`;

const TaskCardDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 576px;
    border-radius: 5px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    background: #fff;
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
        margin: 5px 0 15px 0;
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
        margin-top: 15px;
    }
`;
const TaskTimeDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    width: 95px;
    svg {
        font-size: 15px;
    }
`;
const TaskTimeButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 70px;
    border-radius: 5px;
    background-color: #000;
    color: white;
    p {
        margin: 3px;
        font-size: 6px;
        font-weight: bold;
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
    border: 1px solid black;
    cursor:pointer;
    background-color: ${(props) => (props.isCompleted ? "#000" : "#fff")};
    color: ${(props) => (props.isCompleted ? "#fff" : "#000")};
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
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 30px;
    svg {
        font-size: 20px;
        margin: 5px;
    }
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

                <TaskCardDiv onClick={()=>dispatch(focusOnTask(task))}>
                    <TaskTimerDiv>
                        <BsClockFill style={{ fontSize: "50px" }} onClick={() => dispatch(toggleIsRunning(task.id))} />
                        <p>{formattedTimeString(task.remainingTime)}</p>
                    </TaskTimerDiv>

                    <TaskDetailsDiv>
                        <TaskTimeDiv>
                            <TaskTimeButton>
                                <AiOutlineClockCircle />
                                <p>{Math.round(task.time / 60) + "mins"}</p>
                            </TaskTimeButton>
                            <ImLoop2 onClick={() => dispatch(reset(task.id))} />
                        </TaskTimeDiv>

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
                    </TaskDetailsDiv>

                    <TaskControllerDiv>
                        <ImCancelCircle onClick={() => dispatch(remove(task.id))} />
                    </TaskControllerDiv>
                </TaskCardDiv>
            </TaskCardContainer>
        </Flipped>
    );
}
