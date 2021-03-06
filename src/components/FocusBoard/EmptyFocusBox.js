import React from "react";
import styled from "styled-components";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPen } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import { focusOnTask } from "../../containers/taskBoard/taskBoardSlice";

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
    border-radius: 10px;
    /* background-color: #FABB18; */
    /* box-shadow: 0 2px 10px rgba(166, 173, 201, 0.5);
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.5); */
`;

const FocussedTaskContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    height: 30%;
    width: 90%;
    max-width: 376px;
    border-radius: 10px;
    border: 3px solid black;
    word-wrap: break-word;
    background-color:${p=>p.theme.backgroundSecondary};
    color:${p=>p.theme.primaryText};
    svg {
        font-size: 3em;
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
    background-color:${p=>p.theme.type==="l"?"#FFF":"#FFE39E"};
    color:#000;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    border-radius: 50%;
    font-weight: bold;
    svg{
        font-size:1.6em;
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
        font-size: 0.9em;
    }
`;

const HelpPickTaskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
`;

const HelpPickTaskLabel = styled.div`
    display: flex;
    align-items: center;
    /* flex-direction: column; */
    justify-content: center;
    width: 45%;
    height: 95%;
    
    p {
        margin: 0 3px;
        font-size: 0.9em;
        font-weight: bold;
        /* color: #fabb18; */
    }
    svg {
        font-size: 1.6em;
    }
    /* background-color: cyan; */
`;

const HelpPickTaskButtonBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
    height: 95%;
    /* background-color: lightblue; */
`;

const HelpPickTaskButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40%;
    border-radius: 5px;
    border: 2px solid #fabb18;
    span {
        font-size: 0.7em;
        font-weight: bold;
    }
    cursor: pointer;
    background-color:${p=>p.theme.backgroundSecondary};
    color:${p=>p.theme.primaryText};
    &:hover {
        color:${p=>p.theme.secondaryText};
        background-color:${p=>p.theme.highlight};
    }
`;

export function EmptyFocusBox({ noTasks,noChoice }) {
    const dispatch = useDispatch();

    return (
        <FocussedTaskDiv>
            <FocussedTaskPlayer>
                <FocussedTaskTimer>
                    <div style={{ width: 100, height: 100 }}>
                        <CircularProgressbarWithChildren
                            value={100}
                            styles={buildStyles({
                                pathColor: "#121212",
                                trailColor: "#F0F8FF",
                            })}
                            strokeWidth={9}
                        >
                            <CountdownTimerDiv>
                                <HiClock/>
                            </CountdownTimerDiv>
                        </CircularProgressbarWithChildren>
                    </div>
                </FocussedTaskTimer>

                <FocussedTaskController>
                    <PlayPauseButtonDiv data-tip="" data-for="Create">
                        <FaPen />
                        <ReactTooltip id="Create" getContent={() => (noTasks ? "No task" : "Focus on task")} />
                    </PlayPauseButtonDiv>
                </FocussedTaskController>
            </FocussedTaskPlayer>
            <FocussedTaskContent>
                {(noChoice || noTasks) ? (
                    <CgNotes />
                ) : (
                    <HelpPickTaskContainer>
                        <HelpPickTaskLabel>
                            <CgNotes />
                            <p>Focus on</p>
                        </HelpPickTaskLabel>

                        <HelpPickTaskButtonBox>
                            <HelpPickTaskButton onClick={() => dispatch(focusOnTask("smallest"))}>
                                <span>Smallest task</span>
                            </HelpPickTaskButton>
                            <HelpPickTaskButton onClick={() => dispatch(focusOnTask("largest"))}>
                                <span>Biggest task</span>
                            </HelpPickTaskButton>
                        </HelpPickTaskButtonBox>
                    </HelpPickTaskContainer>
                )}
            </FocussedTaskContent>
        </FocussedTaskDiv>
    );
}
