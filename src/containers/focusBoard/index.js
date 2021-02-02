import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleIsRunning , reset , tick } from "./focusBoardSlice";
import { updateTask } from "./../taskBoard/taskBoardSlice";
import useTimer from "./../../hooks/useTimer"; 

const FocusBoardContainer = styled.div`
    flex: 2 1 0;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    background-color: #f8f8ff;
`;

export function FocusBoard() {
    const focussedTask = useSelector((state) => state.focusBoard.focussedTask);
    const dispatch = useDispatch();

    const delay = 1000;
    useTimer(
        () => {
            if(focussedTask===null) return;
            else if (focussedTask.remainingTime > 0) {
                dispatch(tick());
            } else if (focussedTask.remainingTime === 0) {
                dispatch(toggleIsRunning());
            }
        },
        (focussedTask!==null && focussedTask.isRunning) ? delay : null
    );

    function playStateHandler(task){
        dispatch(toggleIsRunning());
        let temp = {...task};
        temp.isRunning=!temp.isRunning;
        dispatch(updateTask(temp));
    }

    function resetHandler(task){
        dispatch(reset());
        let temp = {...task};
        temp.isRunning=false;
        temp.remainingTime=temp.time;
        dispatch(updateTask(temp));
    }

    return (
        <FocusBoardContainer>
            {focussedTask != null && (
                <div>
                    <h1>{focussedTask.content}</h1>
                    <br />
                    <h1>{focussedTask.remainingTime}</h1>
                    <br />
                    <h1>{focussedTask.globalKey}</h1>
                    <br />
                    <input type="button" value="Plause" onClick={()=>playStateHandler(focussedTask)}/>
                    <input type="button" value="reset" onClick={()=>resetHandler(focussedTask)}/>
                    <br />
                </div>
            )}
        </FocusBoardContainer>
    );
}
