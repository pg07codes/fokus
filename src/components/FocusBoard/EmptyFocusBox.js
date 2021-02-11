import React from "react";
import styled from "styled-components";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResetIcon } from "./../../components/customIcons";
import { CgNotes } from "react-icons/cg";

const FocussedTaskTimer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
`;

const CountdownTimerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    border-radius: 50%;
    & > p {
        font-size: 0.9em;
        font-weight: bold;
        color: ${(p) => (p.isDisabled ? "#c1c1d7" : "#000")};
    }
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
    right: 7px;
    cursor: ${(p) => (p.isDisabled ? "default" : "pointer")};
    svg {
        color: #fff;
        width: 20px;
    }
`;

const EmptyFocusDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const NotesIconDiv = styled.div`
    display: flex;
    height: 30%;
    svg {
        font-size: 80px;
        color: #c1c1d7;
    }
`;
const EmptyFocusDivText = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 10px;
    height: 20%;
    width: 90%;
    p {
        margin-bottom: 10px;
        display: inline-block;
        font-weight: bold;
        color: #c1c1d7;
    }
`;

export function EmptyFocusBox() {
    return (
        <EmptyFocusDiv>
            <FocussedTaskTimer>
                <div style={{ width: 120, height: 120 }}>
                    <CircularProgressbarWithChildren
                        value={100}
                        styles={buildStyles({
                            pathColor: "#c1c1d7",
                        })}
                        strokeWidth={6}
                    >
                        <CountdownTimerDiv isDisabled={true}>
                            <p>{"00m 00s"}</p>
                        </CountdownTimerDiv>
                    </CircularProgressbarWithChildren>
                </div>
            </FocussedTaskTimer>

            <NotesIconDiv>
                <CgNotes />
            </NotesIconDiv>

            <EmptyFocusDivText>
                <p>Choose a task to focus on</p>
            </EmptyFocusDivText>
            <ResetButtonDiv isDisabled={true}>
                <ResetIcon />
            </ResetButtonDiv>
        </EmptyFocusDiv>
    );
}
