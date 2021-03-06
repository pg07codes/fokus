import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
    toggleIsRunning,
    tick,
    updateTaskTimeByVal,
    resetTaskTimer,
    toggleSoundscapeState,
    toggleIsCompleted,
    resetFocussedTask,
    rearrange,
} from "./../../containers/taskBoard/taskBoardSlice";
import useTimer from "../../hooks/useTimer";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResetIcon } from "./../../components/customIcons";
import dingSound from "./../../sounds/ding.mp3";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";
import { formattedTimeStringv2, updatePageTitle } from "./../../helpers";
import { MIN_TO_MS } from "../../helpers/constants";
import ReactTooltip from "react-tooltip";

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
    background-color: ${(p) => p.theme.backgroundSecondary};
    color: ${(p) => p.theme.primaryText};
    text-shadow: 0 0 4px rgb(248, 185, 23, 0.4);
    p {
        min-width: 0;
        font-weight: bold;
        font-size: 0.9em;
        margin: 3px;
    }
    position: relative;
    /* -webkit-box-shadow: 0 1px 8px rgb(248, 185, 23, 0.8);
    box-shadow: 0 1px 8px rgb(248, 185, 23, 0.8); */
`;

const TotalTaskTimeBadge = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    border-radius: 3px;
    p {
        font-size: 0.7em;
        color: ${(p) => p.theme.secondaryText};
        margin: 3px 5px;
    }
    background-color: #fabb18;
    position: absolute;
    top: 3px;
    right: 3px;
    opacity: 0.6;
    &:hover {
        opacity: 1;
    }
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
    background-color: ${(p) => (p.theme.type === "l" ? "#FFF" : "#FFE39E")};
    color: #000;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    border-radius: 50%;
    font-weight: bold;
    p {
        margin: 0;
        font-size: 0.9em;
    }
    span {
        margin: 0 2px;
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

const TaskCompletedDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    margin: 10px 20px;
    svg {
        color: ${(p) => p.theme.secondaryText};
        font-size: 2em;
    }
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
    cursor: pointer;
    background-color: #000;
    svg {
        color: #fabb18;
        width: 20px;
    }
`;

export function FocussedTask() {
    const focussedTaskIndex = useSelector((state) => state.tasks.meta.focussedTaskIndex);
    const autoCompleteZeroTimeTask = useSelector((s) => s.settings.autoCompleteZeroTimeTask);
    let focussedTask = useSelector((state) => (focussedTaskIndex !== -1 ? state.tasks.taskArray[focussedTaskIndex] : null));
    const dispatch = useDispatch();
    const delay = 1010; // to account for the delay in executing code.
    useTimer(
        (deltaMS) => {
            if (focussedTask === null) return;
            else if (focussedTask.remainingTime > 0) {
                dispatch(tick({ focussedTaskIndex, deltaMS }));
            } else if (focussedTask.remainingTime === 0) {
                dingSoundElement.play();
                if(document.hidden) updatePageTitle(`Fokus: TIMER UP!!!`);
                dispatch(toggleSoundscapeState(false));
                dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
                if (autoCompleteZeroTimeTask) {
                    dispatch(resetFocussedTask());
                    dispatch(toggleIsCompleted(focussedTask.id));
                    dispatch(rearrange({ id: focussedTask.id, markedAsComplete: true }));
                }
            }
        },
        focussedTask !== null && focussedTask.isRunning ? delay : null
    );

    function updateTaskTimeHandler(val) {
        if (focussedTask.time + val * MIN_TO_MS < 0) return;
        if (focussedTask.time + val * MIN_TO_MS > 120 * MIN_TO_MS) return;
        if (focussedTask.isRunning) dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
        dispatch(updateTaskTimeByVal({ focussedTaskIndex, val }));
        dispatch(toggleSoundscapeState(false));
    }

    function playPauseHandler(focussedTaskIndex, wasTaskRunning) {
        dispatch(toggleIsRunning({ idx: focussedTaskIndex }));
        if (wasTaskRunning) {
            updatePageTitle("Fokus");
            dispatch(toggleSoundscapeState(false));
        } else {
            updatePageTitle(`Fokus: ${focussedTask.content}`);
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
                                pathColor: "#121212",
                                trailColor: "#F0F8FF",
                            })}
                            strokeWidth={9}
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
                    <UpdateTimeButtonDiv isDisabled={focussedTask.time + 5 * MIN_TO_MS > 120 * MIN_TO_MS} onClick={() => updateTaskTimeHandler(5)}>
                        <h4>+5</h4>
                    </UpdateTimeButtonDiv>

                    {focussedTask.remainingTime !== 0 ? (
                        <PlayPauseButtonDiv isPlayBtn={!focussedTask.isRunning} onClick={() => playPauseHandler(focussedTaskIndex, focussedTask.isRunning)}>
                            {focussedTask.isRunning ? <BsFillPauseFill /> : <BsFillPlayFill />}
                        </PlayPauseButtonDiv>
                    ) : (
                        <TaskCompletedDiv data-tip="" data-for="taskCompleted">
                            <FaClipboardCheck />
                            <ReactTooltip id="taskCompleted" getContent={() => "Task Completed"} />
                        </TaskCompletedDiv>
                    )}

                    <UpdateTimeButtonDiv isDisabled={focussedTask.time - 5 * MIN_TO_MS < 0} onClick={() => updateTaskTimeHandler(-5)}>
                        <h4>-5</h4>
                    </UpdateTimeButtonDiv>
                </FocussedTaskController>

                <ResetButtonDiv
                    onClick={() => {
                        dispatch(toggleSoundscapeState(false));
                        dispatch(resetTaskTimer(focussedTaskIndex));
                    }}
                    data-for="reset"
                    data-tip=""
                >
                    <ResetIcon />
                    <ReactTooltip id="reset" getContent={() => "Reset"} />
                </ResetButtonDiv>
            </FocussedTaskPlayer>
            <FocussedTaskContent>
                <p>{focussedTask.content}</p>
                <TotalTaskTimeBadge data-tip="" data-for="totalTimeBadge">
                    <p>{totalTaskMins}m</p>
                    <ReactTooltip id="totalTimeBadge" getContent={() => "Task's total time"} />
                </TotalTaskTimeBadge>
            </FocussedTaskContent>
        </FocussedTaskDiv>
    );
}
