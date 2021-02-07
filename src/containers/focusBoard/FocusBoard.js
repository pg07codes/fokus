import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleIsRunning, resetTaskTimer, tick , updateTask } from "./../taskBoard/taskBoardSlice";
import useTimer from "../../hooks/useTimer";
import { formattedTimeString } from "../../helpers";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { ImLoop2 } from "react-icons/im";
import dingSound from "./../../sounds/ding.mp3";

let dingSoundElement = new Audio(dingSound);

const FocusBoardContainer = styled.div`
    flex: 2 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    /* background-color: #f8f8ff; */
`;

const FocussedTaskDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 400px;
    height: 400px;
    margin: 20px;
    box-shadow: 0 0 6px rgba(0, 0, 2, 0.3);
    /* background-color: #fffccc; */
`;

const FocussedTaskTimer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 40%;
    /* background-color: #ffeaca; */
`;

const TimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    /* background-color: #ff1c1c; */
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    /* background-color: #ffaa1c; */
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    margin: 15px;
`;

const FocussedTaskContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 90%;
    height: 30%;
    word-wrap: break-word;
    /* background-color: #ffea1c; */
`;

const FocussedTaskController = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 90%;
    height: 20%;
    /* background-color: #efaaa1; */
`;

export function FocusBoard() {
    const focussedTaskIndex = useSelector((state) => state.tasks.meta.focussedTaskIndex);
    let focussedTask = useSelector((state) => state.tasks.taskArray[focussedTaskIndex]);
    if (focussedTaskIndex === -1) focussedTask = null;
    const dispatch = useDispatch();
    const delay = 1000;
    useTimer(
        () => {
            if (focussedTask === null) return;
            else if (focussedTask.remainingTime > 0) {
                dispatch(tick(focussedTaskIndex));
            } else if (focussedTask.remainingTime === 0) {
                dispatch(toggleIsRunning(focussedTaskIndex));
                dingSoundElement.play();
            }
        },
        focussedTask !== null && focussedTask.isRunning ? delay : null
    );

    function updateTaskTimeHandler(task, val) {
        if (task.isCompleted) return;
        dispatch(toggleIsRunning(false));
        // dispatch(updateTaskTime(val));
        let temp = { ...task };
        temp.time += val * 60;
        temp.remainingTime += val * 60;
        dispatch(updateTask(temp));
    }

    return (
        <FocusBoardContainer>
            {focussedTask != null && (
                <div>
                    <FocussedTaskDiv>
                        <FocussedTaskTimer>
                            <ButtonContainer onClick={() => updateTaskTimeHandler(focussedTask, -5)}>
                                <h4>-5</h4>
                            </ButtonContainer>
                            <div style={{ width: 140, height: 140 }}>
                                <CircularProgressbarWithChildren
                                    value={Math.floor((focussedTask.remainingTime / focussedTask.time) * 100)}
                                    styles={buildStyles({
                                        strokeLinecap: "butt",
                                        pathColor: "black",
                                        trailColor: "white",
                                    })}
                                >
                                    <TimerDiv>
                                        <h3>{formattedTimeString(focussedTask.remainingTime)}</h3>
                                    </TimerDiv>
                                </CircularProgressbarWithChildren>
                            </div>
                            <ButtonContainer onClick={() => updateTaskTimeHandler(focussedTask, 5)}>
                                <h4>+5</h4>
                            </ButtonContainer>
                        </FocussedTaskTimer>
                        <FocussedTaskContent>
                            <h4 style={{ minWidth: 0 }}>{focussedTask.content}</h4>
                        </FocussedTaskContent>
                        <FocussedTaskController>
                            <ButtonContainer onClick={() => dispatch(toggleIsRunning(focussedTaskIndex))} style={{ fontSize: "1.5em" }}>
                                {focussedTask.isRunning ? <BsFillPauseFill /> : <BsFillPlayFill />}
                            </ButtonContainer>
                            <ButtonContainer onClick={() => dispatch(resetTaskTimer(focussedTaskIndex))}>
                                <ImLoop2 />
                            </ButtonContainer>
                        </FocussedTaskController>
                    </FocussedTaskDiv>
                </div>
            )}
        </FocusBoardContainer>
    );
}
