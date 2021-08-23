import React from "react";
import styled from "styled-components";
import emptyNotes from "./../../images/emptyNotes.svg";
import ReactTooltip from "react-tooltip";

const NoNotesDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoNotesIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 60%;
    }
`;

export default function EmptyNotes() {
    return (
        <NoNotesDiv>
            <NoNotesIcon data-tip="" data-for="emptyNotesIcon">
                <img src={emptyNotes} alt={"No Notes"} />
            </NoNotesIcon>
            <ReactTooltip id="emptyNotesIcon" getContent={()=>"Create Notes here"}/>
        </NoNotesDiv>
    );
}
