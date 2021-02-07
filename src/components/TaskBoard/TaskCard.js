import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, updateTaskContent, toggleIsCompleted, rearrange, updateTask } from "../../containers/taskBoard/taskBoardSlice";
import { focusOnTask, resetFocussedTask , toggleIsRunning} from "../../containers/focusBoard/focusBoardSlice";
import styled from "styled-components";
import { FaRegLightbulb, FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";
import { Flipped } from "react-flip-toolkit";
import { GrDrag } from "react-icons/gr";
import { formattedTimeString } from "../../helpers";

const TaskCardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 476px;
    height: 120px;
    margin-top: 25px;
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
    width: 420px;
    border-radius: 5px;
    -webkit-box-shadow: ${(props) => (props.isFocussed ? "0 0 6px rgb(255, 216, 0, 0.6)" : "0 0 4px rgb(0, 0, 0, 0.2)")};
    box-shadow: ${(props) => (props.isFocussed ? "0 0 6px rgb(255, 216, 0, 0.6)" : "0 0 4px rgb(0, 0, 0, 0.2)")};
    border: ${(props) => (props.isFocussed ? "2px solid #ffd800" : "none")};
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
        border: 2px #7e8d9f dashed;
        border-radius: 5px;
    }
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
        font-size: 0.8em;
    }
    svg {
        font-size: 2.5em;
        color: ${(p) => (p.isCompleted ? "#00a86b" : p.isFocussed ? "#ffd800" : "#000")};
    }
`;

const TaskActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    &:hover {
        background-color: #c0c0c0;
    }
    p {
        margin: 5px;
        font-size: 0.7em;
    }
`;

const TaskDeleteButton = styled.div`
    height: 80%;
    cursor: pointer;
    margin-left: auto;
    color: #d0d0d0;
    &:hover {
        color: #e44d2e;
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

export default function TaskCard({ task, forwardRBDProvided, isFocussed }) {
    const dispatch = useDispatch();

    const [taskUnderEdit, setTaskUnderEdit] = useState(false);
    const [updatedTaskContent, setUpdatedTaskContent] = useState(task.content);
    const [showDragIcon, setShowDragIcon] = useState(false);

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

                <TaskCardDiv isFocussed={isFocussed}>
                    <TaskStatusDiv isFocussed={isFocussed} isCompleted={task.isCompleted}>
                        {task.isCompleted ? <FaCheckCircle /> : isFocussed ? <FaLightbulb /> : <FaRegLightbulb />}
                        {!task.isCompleted && <p>{formattedTimeString(task.remainingTime)}</p>}
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
                                <h3 style={{ minWidth: 0 }} onDoubleClick={() => setTaskUnderEdit(true)}>
                                    {previewTask(task.content)}
                                </h3>
                            )}
                        </TaskContentDiv>

                        <TaskControllerDiv>
                            {!task.isCompleted && (
                                <TaskActionButton
                                    onClick={() => {
                                        isFocussed ? dispatch(resetFocussedTask()) : dispatch(focusOnTask(task));
                                    }}
                                >
                                    <p>{isFocussed ? "Unfocus" : "Focus"}</p>
                                </TaskActionButton>
                            )}

                            <TaskActionButton
                                onClick={
                                    task.isCompleted
                                        ? (e) => {
                                              dispatch(toggleIsCompleted(task.id));
                                              dispatch(rearrange({ id: task.id, markedAsComplete: false }));
                                              e.stopPropagation();
                                          }
                                        : (e) => {
                                              dispatch(toggleIsCompleted(task.id));
                                              dispatch(rearrange({ id: task.id, markedAsComplete: true }));
                                              if(isFocussed)dispatch(resetFocussedTask());
                                              e.stopPropagation();
                                          }
                                }
                            >
                                <p>{task.isCompleted ? "Undone" : "Done"}</p>
                            </TaskActionButton>

                            {!isFocussed && (
                                <TaskDeleteButton
                                    onClick={(e) => {
                                        dispatch(remove(task.id));
                                        e.stopPropagation();
                                        if (isFocussed) {
                                            dispatch(resetFocussedTask());
                                        }
                                    }}
                                >
                                    <BsTrashFill />
                                </TaskDeleteButton>
                            )}
                        </TaskControllerDiv>
                    </TaskDetailsDiv>
                </TaskCardDiv>
            </TaskCardContainer>
        </Flipped>
    );
}
