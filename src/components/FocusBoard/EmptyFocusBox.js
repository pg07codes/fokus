import React from "react";
import styled from "styled-components";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPen } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import ReactTooltip from "react-tooltip";

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
    border:3px solid black;
    word-wrap: break-word;
    svg {
        font-size: 3em;
    }
    background-color: #fff;
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
        font-size:0.9em;
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
        font-size: 0.9em;
    }
`;

export function EmptyFocusBox() {

    return (
        <FocussedTaskDiv>
            <FocussedTaskPlayer>
                <FocussedTaskTimer>
                    <div style={{ width: 100, height: 100 }}>
                        <CircularProgressbarWithChildren
                            value={100}
                            styles={buildStyles({
                                pathColor: "#020202",
                                trailColor: "#F0F8FF",
                            })}
                            strokeWidth={8}
                        >
                            <CountdownTimerDiv>
                                <p>00</p>
                                <span>m</span>
                                <p>00</p>
                                <span>s</span>
                            </CountdownTimerDiv>
                        </CircularProgressbarWithChildren>
                    </div>
                </FocussedTaskTimer>

                <FocussedTaskController>
                    <PlayPauseButtonDiv data-tip="" data-for="Create">
                        <FaPen />
                        <ReactTooltip id="Create" getContent={()=>"Focus on task"} />
                    </PlayPauseButtonDiv>
                </FocussedTaskController>

            </FocussedTaskPlayer>
            <FocussedTaskContent>
                <CgNotes />
            </FocussedTaskContent>
        </FocussedTaskDiv>
    );
}
