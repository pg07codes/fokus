import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleIsRunning, tick, updateTaskTimeByVal, resetTaskTimer, toggleSoundscapeState } from "./../../containers/taskBoard/taskBoardSlice";
import useTimer, { useTimer2 } from "../../hooks/useTimer";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResetIcon } from "./../../components/customIcons";
import dingSound from "./../../sounds/ding.mp3";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { formattedTimeStringv2 } from "./../../helpers";
import { MIN_TO_MS } from "../../helpers/constants";

let dingSoundElement = new Audio(dingSound);

const FocussedTaskDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    background-color: #fabb18;
    width: 100%;
    height: 100%;
    border-radius: 20px;
`;

const FocussedTaskPlayer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 55%;
    /* background-color: red; */
`;

const FocussedTaskContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 5px;
    height: 30%;
    width: 90%;
    max-width: 376px;
    border-radius: 10px;
    border: 3px solid black;
    word-wrap: break-word;
    text-shadow: 0 0 4px rgb(248, 185, 23, 0.4);
    p {
        min-width: 0;
        font-weight: bold;
        margin: 3px;
    }
    position: relative;
    /* -webkit-box-shadow: 0 1px 8px rgb(248, 185, 23, 0.8);
    box-shadow: 0 1px 8px rgb(248, 185, 23, 0.8); */
    background-color: #fff;
`;

const TotalTaskTimeBadge = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    p {
        font-size: 0.7em;
        margin: 3px 5px;
    }
    background-color: #000;
    position: absolute;
    top: 3px;
    right: 3px;
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
    font-weight: bold;
    p {
        margin: 0;
        font-size: 0.9em;
        color: ${(p) => (p.isDisabled ? "#c1c1d7" : "#000")};
    }
    span {
        margin: 0 2px;
        color: #4a4b46;
        font-size: 0.7em;
    }
`;

const FocussedTaskController = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 90%;
    width: 30%;
    /* background-color: #f1f7dd; */
`;

const PlayPauseButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #000;
    border-radius: 50%;
    margin: 10px 20px;
    svg {
        color: #fabb18;
        font-size: 1.5em;
        margin-left: ${(p) => (p.isPlayBtn ? "3px" : "0")};
    }
    cursor: pointer;
`;

const UpdateTimeButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    cursor: ${(p) => (p.isDisabled ? "default" : "pointer")};
    color: ${(p) => (p.isDisabled ? "#777672" : "#000")};
`;

const ResetButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    top: 7px;
    left: 7px;
    background-color: #000;
    svg {
        color: #fabb18;
        width: 20px;
    }
`;

export function FocussedTask() {
    const focussedTaskIndex = useSelector((state) => state.tasks.meta.focussedTaskIndex);
    let focussedTask = useSelector((state) => (focussedTaskIndex !== -1 ? state.tasks.taskArray[focussedTaskIndex] : null));
    const dispatch = useDispatch();
    const delay = 1010; // to account for the delay in executing code.
    // useTimer(
    //     () => {
    //         if (focussedTask === null) return;
    //         else if (focussedTask.remainingTime > 0) {
    //             dispatch(tick(focussedTaskIndex));
    //         } else if (focussedTask.remainingTime === 0) {
    //             dispatch(toggleSoundscapeState(false));
    //             dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
    //             dingSoundElement.play();
    //         }
    //     },
    //     focussedTask !== null && focussedTask.isRunning ? delay : null
    // );
    useTimer2(
        (deltaMS) => {
            if (focussedTask === null) return;
            else if (focussedTask.remainingTime > 0) {
                dispatch(tick({ focussedTaskIndex, deltaMS }));
            } else if (focussedTask.remainingTime === 0) {
                dispatch(toggleSoundscapeState(false));
                dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
                dingSoundElement.play();
            }
        },
        focussedTask !== null && focussedTask.isRunning ? delay : null
    );

    function updateTaskTimeHandler(val) {
        if (focussedTask.time + val * MIN_TO_MS <= 0) return;
        if (focussedTask.time + val * MIN_TO_MS >= 120 * MIN_TO_MS) return;
        if (focussedTask.isRunning) dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
        dispatch(updateTaskTimeByVal({ focussedTaskIndex, val }));
        dispatch(toggleSoundscapeState(false));
    }

    function playPauseHandler(focussedTaskIndex, wasTaskRunning) {
        dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
        if (wasTaskRunning) {
            dispatch(toggleSoundscapeState(false));
        } else {
            dispatch(toggleSoundscapeState(true));
        }
    }

    const countdownObj = formattedTimeStringv2(focussedTask.remainingTime);
    let countdownMins = countdownObj.mins;
    let countdownSecs = countdownObj.secs;

    const totalTaskTimeObj = formattedTimeStringv2(focussedTask.time);
    let totalTaskMins = totalTaskTimeObj.mins;

    return (
        <FocussedTaskDiv>
            <FocussedTaskPlayer>
                <FocussedTaskTimer>
                    <div style={{ width: 100, height: 100 }}>
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
                    <UpdateTimeButtonDiv isDisabled={focussedTask.time + 5 * MIN_TO_MS >= 120 * MIN_TO_MS} onClick={() => updateTaskTimeHandler(5)}>
                        <h4>+5</h4>
                    </UpdateTimeButtonDiv>
                    <PlayPauseButtonDiv isPlayBtn={!focussedTask.isRunning} onClick={() => playPauseHandler(focussedTaskIndex, focussedTask.isRunning)}>
                        {focussedTask.isRunning ? <BsFillPauseFill /> : <BsFillPlayFill />}
                    </PlayPauseButtonDiv>

                    <UpdateTimeButtonDiv isDisabled={focussedTask.time - 5 * MIN_TO_MS <= 0} onClick={() => updateTaskTimeHandler(-5)}>
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
            <FocussedTaskContent>
                <p>{focussedTask.content}</p>
                <TotalTaskTimeBadge>
                    <p>{totalTaskMins} m</p>
                </TotalTaskTimeBadge>
            </FocussedTaskContent>
        </FocussedTaskDiv>
    );
}
