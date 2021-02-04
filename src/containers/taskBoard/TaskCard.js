import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, updateTaskContent, toggleIsCompleted, rearrange } from "./taskBoardSlice";
import { focusOnTask , resetFocussedTask} from "../focusBoard/focusBoardSlice";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { Flipped } from "react-flip-toolkit";
import { GrDrag } from "react-icons/gr";
import { formattedTimeString } from "./../../helpers";

const TaskCardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 576px;
    height: 140px;
    margin: 25px;
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
    /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2); */
    -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    border: ${(props) => (props.isFocussed ? "2px solid black" : "none")};
`;

const TaskDetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 75%;
    margin: 0 0 0 10px;
    /* background-color: #fff1fc; */
`;

const TaskContentDiv = styled.div`
    display: flex;
    align-items: center;
    height: 65%;
    margin: 0 0 0 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    word-wrap: break-word;
    /* background-color: #fffcec; */
    h3:hover {
        cursor: text;
    }
`;

const TaskEditInput = styled.textarea`
    resize: none;
    height: 90%;
    width: 100%;
    font-size: 1.17em;
    font-weight: bold;
    overflow: hidden;
    vertical-align: center;
    &:focus {
        outline: none;
        border: 2px black dashed;
        border-radius: 5px;
    }
`;

const TaskTimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 15%;
    /* background-color: #f8f8ff; */
    position: relative;
    p {
        margin: 5px;
        font-size: 1em;
    }
    svg {
        font-size: 2.5em;
        margin-top: 25px;
    }
`;
const TaskTimeDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80%;
    width: 110px;
`;
const TaskTimeButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 70px;
    border-radius: 5px;
    border: 1px solid black;
    margin: 5px;
    background-color: #fff;
    color: #000;
    p {
        margin: 0;
        font-size: 0.7em;
    }
`;

const TaskDoneButton = styled.div`
    display: flex;
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
    const dispatch = useDispatch();

    const [taskUnderEdit, setTaskUnderEdit] = useState(false);
    const [updatedTaskContent, setUpdatedTaskContent] = useState(task.content);
    const [showDragIcon, setShowDragIcon] = useState(false);

    const focussedTask = useSelector((state) => state.focusBoard.focussedTask);

    function submitUpdatedTaskContent(e) {
        if (e.key === "Enter" && updatedTaskContent.trim().length >= 3) {
            let temp = updatedTaskContent.trim().split(" ");
            let time = 0;
            if (temp.length !== 1 && !isNaN(parseInt(temp[temp.length - 1]))) {
                time = parseInt(temp.pop());
            }
            temp = temp.join(" ");
            // manage to update time also
            dispatch(updateTaskContent({ id: task.id, updatedTaskContent }));
            setTaskUnderEdit(false);
        }
    }

    function isFocussed(id) {
        if (focussedTask !== null && focussedTask.id === id) return true;
        return false;
    }

    return (
        <Flipped flipId={`${task.id}`}>
            <TaskCardContainer
                ref={forwardRBDProvided.innerRef}
                {...forwardRBDProvided.draggableProps}
                {...forwardRBDProvided.dragHandleProps}
                onMouseEnter={() => setShowDragIcon(!task.isCompleted && true)}
                onMouseLeave={() => setShowDragIcon(!task.isCompleted && false)}
            >
                <TaskCardDragIcon>{showDragIcon && <GrDrag />}</TaskCardDragIcon>

                <TaskCardDiv onClick={() => dispatch(focusOnTask(task))} isFocussed={isFocussed(task.id)}>
                    <TaskTimerDiv>
                        <FiClock />
                        <p>{formattedTimeString(task.remainingTime)}</p>
                    </TaskTimerDiv>

                    <TaskDetailsDiv>
                        <TaskContentDiv>
                            {taskUnderEdit ? (
                                <TaskEditInput
                                    autoFocus
                                    value={updatedTaskContent}
                                    onBlur={() => {
                                        dispatch(updateTaskContent({ id: task.id, updatedTaskContent }));
                                        setTaskUnderEdit(false);
                                    }}
                                    onKeyDown={submitUpdatedTaskContent}
                                    onChange={(e) => setUpdatedTaskContent(e.target.value)}
                                />
                            ) : (
                                <h3 style={{ minWidth: 0 }} onDoubleClick={() => setTaskUnderEdit(true)}>
                                    {previewTask(task.content)}
                                </h3>
                            )}
                        </TaskContentDiv>

                        <TaskControllerDiv>
                            <TaskDoneButton
                                isCompleted={task.isCompleted}
                                onClick={
                                    task.isCompleted
                                        ? (e) => {
                                              dispatch(toggleIsCompleted(task.id));
                                              dispatch(rearrange({ id: task.id, markedAsComplete: false }));
                                              dispatch(focusOnTask(task))
                                              e.stopPropagation();
                                          }
                                        : (e) => {
                                              dispatch(toggleIsCompleted(task.id));
                                              dispatch(rearrange({ id: task.id, markedAsComplete: true }));
                                              dispatch(focusOnTask(task))
                                              e.stopPropagation();
                                          }
                                }
                            >
                                <BsCheckCircle />
                                <p>Done</p>
                            </TaskDoneButton>
                            <TaskTimeDiv>
                                <TaskTimeButton>
                                    <AiOutlineClockCircle />
                                    <p>{Math.round(task.time / 60) + "m"}</p>
                                </TaskTimeButton>
                            </TaskTimeDiv>

                            <TaskDeleteButton
                                onClick={(e) => {
                                    dispatch(remove(task.id));
                                    e.stopPropagation();
                                    if(isFocussed(task.id)){
                                        dispatch(resetFocussedTask());
                                    }
                                }}
                            >
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
