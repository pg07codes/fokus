import React, { useState } from "react";
import styled from "styled-components";
import { BsCalendarFill } from "react-icons/bs";
import { getFormattedDate } from "./../../helpers";

const DayDateDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 15%;
    background-color: #000;
    border-radius: 10px;
`;

const CalendarIconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    svg {
        color: #fff;
        font-size: 1.7em;
    }
`;

const DayDateText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 65%;
    font-weight: bold;
    font-size: 0.9em;
    color:#fff;
    span {
    }
    p {
        margin: 0;
    }
`;

export function DayDate() {
    const DateObj = getFormattedDate();
    return (
        <DayDateDiv>
            <DayDateText>
                <span>
                    {DateObj.day} {DateObj.date}
                </span>
                <p>
                    {DateObj.month} {DateObj.year}
                </p>
            </DayDateText>
            <CalendarIconDiv>
                <BsCalendarFill />
            </CalendarIconDiv>
        </DayDateDiv>
    );
}
