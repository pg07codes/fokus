import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { FocussedTask } from "./../../components/FocusBoard/FocussedTask";
import { EmptyFocusBox } from "./../../components/FocusBoard/EmptyFocusBox";
import { Soundscapes } from "./../../components/MusicBox/Soundscapes";

const FocusBoardContainer = styled.div`
    flex: 1 1 0;
    min-width: 346px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:0 0 0 20px;
    height:100%;
    /* background-color:silver; */
`;

const FocussedTaskContainer = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    flex-direction: column;
    width: 80%;
    max-width: 326px;
    height: 226px;
    margin: 10px 0;
    /* background-color: green; */
`;

const MusicBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    max-width: 326px;
    height: 186px;
    margin: 10px 0;
    background-color:${p=>p.theme.backgroundSecondary};
    border-radius: 20px;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
`;

// this can be improved as right now whole focus board is re-rendered and not just the focus task containter

export function FocusBoard() {
    const focussedTaskIndex = useSelector((state) => state.tasks.meta.focussedTaskIndex);
    const noTasks = useSelector((s) => s.tasks.taskArray.length===s.tasks.meta.completedTasksCount?true:false);
    const noChoice = useSelector((s) => s.tasks.taskArray.length-s.tasks.meta.completedTasksCount<=1?true:false);
    return (
        <FocusBoardContainer>
            <FocussedTaskContainer>
                {focussedTaskIndex !== -1 ? <FocussedTask /> : <EmptyFocusBox noChoice={noChoice} noTasks={noTasks}/>}
            </FocussedTaskContainer>
            <MusicBoxContainer>
                <Soundscapes />
            </MusicBoxContainer>
        </FocusBoardContainer>
    );
}
