import React, { useState } from "react";
import styled from "styled-components";
import { BsCalendarFill } from "react-icons/bs";
import { getFormattedDate, getOrdinalSuffix } from "../../helpers";

const DayDateDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    width: 25%;
    height: 55%;
`;

const CalendarIconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    svg {
        color: #fabb18;
        font-size: 1.4em;
    }
`;

const DayDateText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 70%;
    font-weight: bold;
    font-size: 0.8em;
    color: ${(p) => p.theme.primaryText};
    p {
        margin: 0;
    }
    sup {
        font-size: 0.5em;
    }
`;

export function DayDate() {
    const DateObj = getFormattedDate();
    return (
        <DayDateDiv>
            <CalendarIconDiv>
                <BsCalendarFill />
            </CalendarIconDiv>
            <DayDateText>
                <span>
                    {DateObj.day} {DateObj.date}
                    <sup>{getOrdinalSuffix(DateObj.date)}</sup>
                </span>
                <p>
                    {DateObj.month}, {DateObj.year}
                </p>
            </DayDateText>
        </DayDateDiv>
    );
}
