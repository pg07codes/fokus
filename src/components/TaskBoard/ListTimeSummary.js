import React from "react";
import styled from "styled-components";
import { getFormattedListTimeSummary } from "./../../helpers";

const ListTimeSummaryDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 140px;
    min-height: 90px;
    background-color: #c1c1d7;
    border-radius: 10px;
    margin: 20px;
    -webkit-box-shadow: 0 3px 6px rgba(166, 173, 201, 0.2);
    box-shadow: 0 3px 6px rgba(166, 173, 201, 0.2);
`;

export default function ListTimeSummary({ time }) {
    return (
        <ListTimeSummaryDiv>
            <p>{getFormattedListTimeSummary(time)}</p>
        </ListTimeSummaryDiv>
    );
}
