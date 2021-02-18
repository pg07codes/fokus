import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { toggleIsRunning, tick, updateTaskTimeByVal, resetTaskTimer, toggleSoundscapeState } from "./../../containers/taskBoard/taskBoardSlice";
import useTimer from "../../hooks/useTimer";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResetIcon } from "./../../components/customIcons";
import dingSound from "./../../sounds/ding.mp3";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { formattedTimeStringv2, getFormattedDate } from "./../../helpers";

let dingSoundElement = new Audio(dingSound);

const FocussedTaskDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const FocussedTaskContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 5px;
    padding: 5px;
    height: 35%;
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    word-wrap: break-word;
    p {
        min-width: 0;
        font-weight: bold;
        margin: 3px;
    }
    -webkit-box-shadow: 0 1px 8px rgb(248, 185, 23, 0.8);
    box-shadow: 0 1px 8px rgb(248, 185, 23, 0.8);
    /* background-color: #edaaf1; */
`;

const FocussedTaskPlayer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    width: 100%;
    height: 55%;
    border-radius: 10px;
    background-color: #0000cd;
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.5);
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.5);
`;

const FocussedTaskTimer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    width: 50%;
    /* background-color: #df1aa1; */
`;

const CountdownTimerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    height: 85%;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    border-radius: 50%;
    p {
        margin: 0;
        font-weight: bold;
        color: ${(p) => (p.isDisabled ? "#c1c1d7" : "#000")};
    }
    span {
        margin: 0 2px;
        color: #4a4b46;
        font-size: 0.8em;
        font-weight: bold;
    }
`;

const FocussedTaskController = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 80%;
    width: 30%;
    /* background-color: #f1f7dd; */
`;

const PlayPauseButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    background-color: #fff;
    border-radius: 50%;
    margin: 10px 20px;
    svg {
        color: #0000cd;
        font-size: 1.8em;
        margin-left: ${(p) => (p.isPlayBtn ? "3px" : "0")};
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
    color: #fff;
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
    left: 7px;
    background-color: #fff;
    cursor: ${(p) => (p.isDisabled ? "default" : "pointer")};
    svg {
        color: #0000cd;
        width: 20px;
    }
`;

export function FocussedTask() {
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
                dispatch(toggleSoundscapeState(false));
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
        dispatch(toggleSoundscapeState(false));
    }

    function playPauseHandler(focussedTaskIndex, wasTaskRunning) {
        dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
        if (wasTaskRunning) {
            console.log("set to pausing sound");
            dispatch(toggleSoundscapeState(false));
        } else {
            console.log("set to playing sound");
            dispatch(toggleSoundscapeState(true));
        }
    }

    const countdownObj = formattedTimeStringv2(focussedTask.remainingTime);
    let countdownMins = countdownObj.mins;
    let countdownSecs = countdownObj.secs;

    return (
        <FocussedTaskDiv>
            <FocussedTaskContent>
                <p>{focussedTask.content}</p>
            </FocussedTaskContent>

            <FocussedTaskPlayer>
                <FocussedTaskTimer>
                    <div style={{ width: 110, height: 110 }}>
                        <CircularProgressbarWithChildren
                            value={focussedTask.time !== 0 ? Math.floor((focussedTask.remainingTime / focussedTask.time) * 100) : 0}
                            styles={buildStyles({
                                strokeLinecap: "butt",
                                pathColor: "#020202",
                                trailColor: "#F0F8FF",
                            })}
                            strokeWidth={8}
                        >
                            <CountdownTimerDiv>
                                <p>{countdownMins}</p>
                                <span>m</span>
                                <p>{countdownSecs}</p>
                                <span>s</span>
                            </CountdownTimerDiv>
                        </CircularProgressbarWithChildren>
                    </div>
                </FocussedTaskTimer>

                <FocussedTaskController>
                    <UpdateTimeButtonDiv onClick={() => updateTaskTimeHandler(5)}>
                        <h4>+5</h4>
                    </UpdateTimeButtonDiv>
                    <PlayPauseButtonDiv isPlayBtn={!focussedTask.isRunning} onClick={() => playPauseHandler(focussedTaskIndex, focussedTask.isRunning)}>
                        {focussedTask.isRunning ? <BsFillPauseFill /> : <BsFillPlayFill />}
                    </PlayPauseButtonDiv>

                    <UpdateTimeButtonDiv onClick={() => updateTaskTimeHandler(-5)}>
                        <h4>-5</h4>
                    </UpdateTimeButtonDiv>
                </FocussedTaskController>

                <ResetButtonDiv
                    onClick={() => {
                        dispatch(toggleSoundscapeState(false));
                        dispatch(resetTaskTimer(focussedTaskIndex));
                    }}
                >
                    <ResetIcon />
                </ResetButtonDiv>
            </FocussedTaskPlayer>
        </FocussedTaskDiv>
    );
}
