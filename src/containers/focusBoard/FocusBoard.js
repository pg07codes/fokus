import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleIsRunning, resetTaskTimer, tick, updateTaskTimeByVal } from "../taskBoard/taskBoardSlice";
import useTimer from "../../hooks/useTimer";
import { formattedTimeStringv2 } from "../../helpers";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { ImLoop2 } from "react-icons/im";
import dingSound from "./../../sounds/ding.mp3";
import tasks from "./../../images/tasks.svg";
import { CgNotes } from "react-icons/cg";

let dingSoundElement = new Audio(dingSound);

const FocusBoardContainer = styled.div`
    flex: 3 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px black solid;
`;

const FocussedTaskContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 276px;
    height: 346px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.5);
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.5);
    background-color: #f7f7fa;
`;

const FocussedTaskDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const FocussedTaskTimer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
`;

const CountdownTimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    border-radius: 50%;
    & > p {
        font-size: 0.9em;
        font-weight: bold;
        color: ${(p) => (p.isDisabled ? "#c1c1d7" : "#000")};
    }
`;

const PlayButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    background-color: #0000cd;
    border-radius: 50%;
    margin: 10px 20px;
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 0 1px 7px rgba(0, 0, 0, 0.4);
    svg {
        color: #fff;
        font-size: 1.8em;
    }
    cursor: pointer;
`;

const UpdateTimeButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

const ResetButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: ${(p) => (p.isDisabled ? "#c1c1d7" : "#0000cd")};
    border-radius: 50%;
    width: 30px;
    height: 30px;
    top: 7px;
    right: 7px;
    cursor: pointer;
    svg {
        color: #fff;
        font-size: 0.6em;
    }
`;

const FocussedTaskContent = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 5px;
    height: 30%;
    width: 90%;
    word-wrap: break-word;
    p {
        min-width: 0;
        font-weight: bold;
        margin: 3px;
    }
`;

const FocussedTaskController = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 20%;
    margin-bottom: 10px;
`;

const EmptyFocusBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const NotesIconDiv = styled.div`
    svg{
        font-size:80px;
        color:#c1c1d7
    }
`;
const EmptyFocusBoxText = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 10px;
    height: 15%;
    width: 90%;
    p {
        margin-bottom: 10px;
        display: inline-block;
        font-weight: bold;
        color: #c1c1d7;
    }
`;

export function FocusBoard() {
    const focussedTaskIndex = useSelector((state) => state.tasks.meta.focussedTaskIndex);
    let focussedTask = useSelector((state) => (focussedTaskIndex !== -1 ? state.tasks.taskArray[focussedTaskIndex] : null));
    const dispatch = useDispatch();
    const delay = 1000;
    useTimer(
        () => {
            if (focussedTask === null) return;
            else if (focussedTask.remainingTime > 0) {
                dispatch(tick(focussedTaskIndex));
            } else if (focussedTask.remainingTime === 0) {
                dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
                dingSoundElement.play();
            }
        },
        focussedTask !== null && focussedTask.isRunning ? delay : null
    );

    function updateTaskTimeHandler(val) {
        if (focussedTask.isCompleted) return;
        if (focussedTask.isRunning) dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
        dispatch(updateTaskTimeByVal({ focussedTaskIndex, val }));
    }

    return (
        <FocusBoardContainer>
            <FocussedTaskContainer>
                {focussedTask != null && (
                    <FocussedTaskDiv>
                        <FocussedTaskTimer>
                            <div style={{ width: 120, height: 120 }}>
                                <CircularProgressbarWithChildren
                                    value={focussedTask.time !== 0 ? Math.floor((focussedTask.remainingTime / focussedTask.time) * 100) : 0}
                                    styles={buildStyles({
                                        strokeLinecap: "butt",

                                        pathColor: "#0000cd",
                                        trailColor: "#EFF7FF",
                                    })}
                                    strokeWidth={6}
                                >
                                    <CountdownTimerDiv>
                                        <p>{formattedTimeStringv2(focussedTask.remainingTime)}</p>
                                    </CountdownTimerDiv>
                                </CircularProgressbarWithChildren>
                            </div>
                        </FocussedTaskTimer>
                        <FocussedTaskContent>
                            <p>{focussedTask.content}</p>
                        </FocussedTaskContent>
                        <FocussedTaskController>
                            <UpdateTimeButtonDiv onClick={() => updateTaskTimeHandler(-5)}>
                                <h4>-5</h4>
                            </UpdateTimeButtonDiv>
                            <PlayButtonDiv onClick={() => dispatch(toggleIsRunning({ idx: focussedTaskIndex }))}>
                                {focussedTask.isRunning ? <BsFillPauseFill /> : <BsFillPlayFill />}
                            </PlayButtonDiv>

                            <UpdateTimeButtonDiv onClick={() => updateTaskTimeHandler(5)}>
                                <h4>+5</h4>
                            </UpdateTimeButtonDiv>
                        </FocussedTaskController>
                        <ResetButtonDiv onClick={() => dispatch(resetTaskTimer(focussedTaskIndex))}>
                            <ImLoop2 />
                        </ResetButtonDiv>
                    </FocussedTaskDiv>
                )}
                {focussedTask === null && (
                    <EmptyFocusBox>
                        <FocussedTaskTimer>
                            <div style={{ width: 120, height: 120 }}>
                                <CircularProgressbarWithChildren
                                    value={100}
                                    styles={buildStyles({
                                        pathColor: "#c1c1d7",
                                    })}
                                    strokeWidth={6}
                                >
                                    <CountdownTimerDiv isDisabled={true}>
                                        <p>{"20m 00s"}</p>
                                    </CountdownTimerDiv>
                                </CircularProgressbarWithChildren>
                            </div>
                        </FocussedTaskTimer>

                        <NotesIconDiv>
                            <CgNotes />
                        </NotesIconDiv>

                        <EmptyFocusBoxText>
                            <p>Choose a task to focus on</p>
                        </EmptyFocusBoxText>
                        <ResetButtonDiv isDisabled={true}>
                            <ImLoop2 />
                        </ResetButtonDiv>
                    </EmptyFocusBox>
                )}
            </FocussedTaskContainer>
        </FocusBoardContainer>
    );
}
