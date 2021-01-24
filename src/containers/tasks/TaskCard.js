import React from "react";
import { useDispatch } from "react-redux";
import { create, remove, update, tick, reset, toggleIsRunning, toggleIsCompleted } from "./tasksSlice";
import useTimer from "../../hooks/useTimer";
import styled from "styled-components";
import { AiFillPlayCircle, AiFillCheckCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { GrPowerReset } from "react-icons/gr";

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

const TaskCardDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 120px;
    width: 476px;
    border-radius: 20px;
    border: black 2px solid;
`;

const TaskDetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100px;
    width: 240px;
    border-radius: 20px;
    background-color: purple;
    h4,
    p {
        margin: 2px;
        padding: 0;
    }
`;

const TaskTimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    border-radius: 20px;
    background-color: pink;
    position: relative;
`;

const TaskControllerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    width: 40px;
    border-radius: 0 20px 20px 0;
    background-color: aqua;
`;

export default function TaskCard({ task }) {
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

    return (
        <TaskCardDiv>
            <TaskDetailsDiv>
                <p>{Math.round(task.time / 60) + "min"}</p>
                <h4>{task.content}</h4>
                <p>{`created At: ${new Date(task.createdAt).getHours()}:${new Date(task.createdAt).getMinutes()}`}</p>
                {task.isCompleted ? <p>$</p> : ""}
            </TaskDetailsDiv>
            <TaskTimerDiv>
                <h2>{formattedTimeString(task.remainingTime)}</h2>
                <GrPowerReset style={{ position: "absolute", bottom: 3, right: 3 }} onClick={() => dispatch(reset(task.id))}>
                    P
                </GrPowerReset>
            </TaskTimerDiv>

            <TaskControllerDiv>
                <AiFillCheckCircle onClick={() => dispatch(toggleIsCompleted(task.id))} />
                <AiFillPlayCircle onClick={() => dispatch(toggleIsRunning(task.id))} />
                <TiDelete onClick={() => dispatch(remove(task.id))} />
                {/* /<button }>D</button> */}
                {/* <button >R</button> */}
            </TaskControllerDiv>
        </TaskCardDiv>
    );
}
