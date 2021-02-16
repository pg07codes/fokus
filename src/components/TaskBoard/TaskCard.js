import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, updateTaskContent, toggleIsCompleted, rearrange, updateTaskTime } from "../../containers/taskBoard/taskBoardSlice";
import { focusOnTask, resetFocussedTask, toggleIsRunning, updateTaskLabel, updateLabelCount , toggleSoundscapeState} from "../../containers/taskBoard/taskBoardSlice";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import { Flipped } from "react-flip-toolkit";
import { GrDrag } from "react-icons/gr";
import { formattedTimeString } from "../../helpers";
import bulb from "./../../images/bulb.svg";
import glowBulb from "./../../images/glowBulb.svg";
import tickmark from "./../../images/tickmark.svg";
import TaskLabelSelect from "./../../components/TaskBoard/TaskLabelSelect";

const TaskCardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 420px;
    height: 100px;
    margin-top: 15px;
    cursor:default !important;
    /* background-color: #fff4e1; */
`;

const TaskCardDragIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 25px;
    height: 100%;
    /* background-color: #ff09ac; */
    svg {
        cursor: url("https://ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur"), default !important;
        opacity: 0.7;
    }
`;

const getTaskCardDivBorderLabelColor = (labelColor) => (labelColor !== null ? `7px solid ${labelColor}` : "none");

const TaskCardDiv = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    height: 100%;
    width: 376px;
    border-radius: 10px;
    border-right: ${(p) => getTaskCardDivBorderLabelColor(p.labelColor)};
    background-color: #fff;
    -webkit-box-shadow: ${(p) => (p.isFocussed ? "0 1px 8px rgb(248,185,23,0.8)" : "0 5px 10px rgba(166,173,201,0.2)")};
    box-shadow: ${(p) => (p.isFocussed ? "0 1px 8px rgb(248,185,23,0.8)" : "0 5px 10px rgba(166,173,201,0.2)")};
`;

const TaskStatusDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 15%;
    /* background-color: #f8f8ff; */
    position: relative;
    p {
        margin: 5px;
        font-weight: bold;
        font-size: 0.7em;
    }
    img {
        width: ${(p) => (p.isCompleted ? "35px" : "60px")};
    }
`;

const TaskDetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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
    word-wrap: break-word;
    /* background-color: #fffcec; */
    p {
        font-size: 0.9em;
        font-weight: bold;
        min-width: 0;
        &:hover {
            cursor: text;
        }
    }
`;

const TaskEditInput = styled.textarea`
    resize: none;
    height: 90%;
    width: 100%;
    font-size: 0.9em;
    overflow: hidden;
    vertical-align: center;
    font-weight: bold;
    &:focus {
        outline: none;
        border: 2px #0000cd dashed;
        border-radius: 5px;
    }
`;

const TimeEditInput = styled.input`
    height: 15px;
    width: 30px;
    margin-top: 5px;
    text-align: center;
    font-weight: bold;
    &:focus {
        outline: none;
        border: 2px #0000cd dashed;
        border-radius: 2px;
    }
`;

const TaskActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 5px;
    margin: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0000cd;
        p {
            color: #fff;
        }
    }
    p {
        margin: 5px;
        font-weight: bold;
        font-size: 0.65em;
    }
`;

const TaskLabelContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 5px;
    margin: 4px;
    cursor: pointer;
    &:hover {
        background-color: #f7f7fa;
    }
    p {
        margin: 5px;
        color: ${(p) => (p.labelColor !== null ? p.labelColor : "#c1c1d7")};
        font-weight: bold;
        font-size: 0.65em;
    }
`;

const TaskDeleteButton = styled.div`
    height: 80%;
    cursor: pointer;
    margin-left: auto;
    color: #0000cd;
    &:hover {
        color: red;
    }
`;

const TaskControllerDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 25%;
    /* background-color: #fffa91; */
    svg {
        font-size: 0.8em;
        margin: 5px;
    }
`;

function previewTask(str) {
    if (str.length <= 60) return str;
    else return str.substring(0, 60) + "...";
}

export default function TaskCard({ task, taskIndex, focussedTaskGlobalKey, forwardRBDProvided, isFocussed, focussedTaskIndex }) {
    const dispatch = useDispatch();

    const [taskUnderEdit, setTaskUnderEdit] = useState(false);
    const [updatedTaskContent, setUpdatedTaskContent] = useState(task.content);
    const [timeUnderEdit, setTimeUnderEdit] = useState(false);
    const [updatedTime, setUpdatedTime] = useState(Math.floor(task.time / 60));
    const [labelUnderEdit, setLabelUnderEdit] = useState(false);
    const [showDragIcon, setShowDragIcon] = useState(false);

    const labels = useSelector((s) => s.tasks.labels);

    function submitUpdatedTaskContent(e) {
        if (e.key === "Enter" && updatedTaskContent.trim().length >= 3) {
            let temp = updatedTaskContent.trim().split(" ");
            // let time = 0;
            // if (temp.length !== 1 && !isNaN(parseInt(temp[temp.length - 1]))) {
            //     time = parseInt(temp.pop());
            // }
            // temp = temp.join(" ");
            // wont be managing to update time here also
            dispatch(updateTaskContent({ id: task.id, updatedTaskContent }));
            setTaskUnderEdit(false);
        }
    }
    function submitUpdatedTime(e) {
        if (e.key === "Enter") {
            dispatch(updateTaskTime({ id: task.id, updatedTime }));
            setTimeUnderEdit(false);
        }
    }

    function labelSelectOnBlurHandler(taskId, taskLabel, updatedLabel) {
        setLabelUnderEdit(false);
        updatedLabel = updatedLabel === "none" ? null : updatedLabel;
        dispatch(updateTaskLabel({ id: taskId, label: updatedLabel }));
        if (taskLabel !== updatedLabel) dispatch(updateLabelCount({ oldLabel: taskLabel, newLabel: updatedLabel }));
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

                <TaskCardDiv isFocussed={isFocussed} labelColor={task.label !== null ? labels[task.label].color : null}>
                    <TaskStatusDiv isFocussed={isFocussed} isCompleted={task.isCompleted}>
                        {task.isCompleted ? (
                            <img src={tickmark} alt="Done" />
                        ) : isFocussed ? (
                            <img src={glowBulb} alt="Focussed" />
                        ) : (
                            <img src={bulb} alt="Unfocussed" />
                        )}
                        {!task.isCompleted &&
                            (timeUnderEdit ? (
                                <TimeEditInput
                                    autoFocus
                                    value={updatedTime}
                                    onBlur={() => {
                                        dispatch(updateTaskTime({ id: task.id, updatedTime }));
                                        setTimeUnderEdit(false);
                                    }}
                                    onKeyDown={submitUpdatedTime}
                                    onChange={(e) => setUpdatedTime(e.target.value)}
                                />
                            ) : (
                                <p onDoubleClick={() => setTimeUnderEdit(true)}>{formattedTimeString(task.remainingTime)}</p>
                            ))}
                    </TaskStatusDiv>

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
                                <p onDoubleClick={() => setTaskUnderEdit(true)}>{previewTask(task.content)}</p>
                            )}
                        </TaskContentDiv>

                        <TaskControllerDiv>
                            {!task.isCompleted && (
                                <TaskActionButton
                                    isDoneBtn={false}
                                    onClick={
                                        isFocussed
                                            ? () => {
                                                  if (task.isRunning) dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
                                                  dispatch(resetFocussedTask());
                                                  dispatch(toggleSoundscapeState(false));
                                              }
                                            : () => {
                                                  if (focussedTaskIndex !== -1) dispatch(toggleIsRunning({ idx: focussedTaskIndex, val: false }));
                                                  dispatch(toggleSoundscapeState(false));
                                                  dispatch(focusOnTask(taskIndex));
                                              }
                                    }
                                >
                                    <p>{isFocussed ? "Unfocus" : "Focus"}</p>
                                </TaskActionButton>
                            )}

                            <TaskActionButton
                                isDoneBtn={true}
                                onClick={
                                    task.isCompleted
                                        ? (e) => {
                                              if (focussedTaskIndex !== -1 && focussedTaskGlobalKey < task.globalKey) {
                                                  dispatch(focusOnTask(focussedTaskIndex + 1));
                                              }
                                              dispatch(toggleIsCompleted(task.id));
                                              dispatch(rearrange({ id: task.id, markedAsComplete: false }));
                                              e.stopPropagation();
                                          }
                                        : (e) => {
                                              if (taskIndex < focussedTaskIndex) dispatch(focusOnTask(focussedTaskIndex - 1));
                                              if (task.isRunning) dispatch(toggleIsRunning({ idx: taskIndex }));
                                              if (isFocussed) dispatch(resetFocussedTask());
                                              dispatch(toggleIsCompleted(task.id));
                                              dispatch(rearrange({ id: task.id, markedAsComplete: true }));
                                              if(taskIndex===focussedTaskIndex)dispatch(toggleSoundscapeState(false));
                                              e.stopPropagation();
                                          }
                                }
                            >
                                <p>{task.isCompleted ? "Undone" : "Done"}</p>
                            </TaskActionButton>

                            <TaskLabelContainer onClick={() => setLabelUnderEdit(true)} labelColor={task.label !== null ? labels[task.label].color : null}>
                                {labelUnderEdit ? (
                                    <TaskLabelSelect onBlur={labelSelectOnBlurHandler} taskId={task.id} taskLabel={task.label} />
                                ) : task.label !== null ? (
                                    <p>#{task.label}</p>
                                ) : (
                                    <p>Add label</p>
                                )}
                            </TaskLabelContainer>

                            {!isFocussed && (
                                <TaskDeleteButton
                                    onClick={(e) => {
                                        if (taskIndex < focussedTaskIndex) dispatch(focusOnTask(focussedTaskIndex - 1));
                                        dispatch(remove(task.id));
                                        if (task.label !== null) dispatch(updateLabelCount({ oldLabel: task.label, newLabel: null }));
                                        e.stopPropagation();
                                    }}
                                >
                                    <BsTrash />
                                </TaskDeleteButton>
                            )}
                        </TaskControllerDiv>
                    </TaskDetailsDiv>
                </TaskCardDiv>
            </TaskCardContainer>
        </Flipped>
    );
}
