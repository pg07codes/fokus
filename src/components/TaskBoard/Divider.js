import React, { useState } from "react";
import styled from "styled-components";
import { BiShow, BiHide } from "react-icons/bi";
import { AiOutlineClear } from "react-icons/ai";
import { Flipped } from "react-flip-toolkit";
import { useDispatch, useSelector } from "react-redux";
import { clearCompletedTasks, toggleShowCompletedTasks } from "./../../containers/taskBoard/taskBoardSlice";

const DoneTasksDivider = styled.div`
    display: flex;
    margin: 15px 0 15px 25px;
`;
const DividerLine = styled.div`
    width: 100%;
    position: relative;
    margin: 15px;
    border-bottom: 3px solid #FABB18;
`;

const DividerIcon = styled.div`
    width: 90px;
    position: relative;
    top: 3px;
    color: #FABB18;
    p {
        margin: 0;
        font-weight: bold;
        letter-spacing:${(p)=>p.showCompletedTasks?"3px":"1px"};
    }
`;

const DividerActionDiv = styled.div`
    display: flex;
    width: 70px;
    height: 30px;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    background-color: ${(p) => p.theme.backgroundSecondary};
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    svg {
        color: #FABB18;
        cursor:pointer;
    }
`;

export default function Divider() {
    const [showActionBtn, setShowActionBtn] = useState(false);
    const showCompletedTasks = useSelector((s) => s.tasks.meta.showCompletedTasks);
    const completedTasksCount = useSelector((s)=>s.tasks.meta.completedTasksCount);
    const dispatch = useDispatch();
    return (
        <Flipped flipId={`-1`}>
            <DoneTasksDivider>
                <DividerLine />
                <DividerIcon showCompletedTasks={showCompletedTasks} onMouseEnter={() => setShowActionBtn(true)} onMouseLeave={() => setShowActionBtn(false)}>
                    {showActionBtn ? (
                        <DividerActionDiv>
                            {showCompletedTasks ? (
                                <BiHide onClick={() => dispatch(toggleShowCompletedTasks())} />
                            ) : (
                                <BiShow onClick={() => dispatch(toggleShowCompletedTasks())} />
                            )}
                            <AiOutlineClear onClick={() => dispatch(clearCompletedTasks())} />
                        </DividerActionDiv>
                    ) : (
                        <p>{showCompletedTasks?"DONE":`DONE(${completedTasksCount})`}</p>
                        
                    )}
                </DividerIcon>
                <DividerLine />
            </DoneTasksDivider>
        </Flipped>
    );
}
