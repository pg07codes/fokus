import React from "react";
import styled from "styled-components";

const NoteCardContainer = styled.div`
    width:220px;
    height:160px;
    border:2px black solid;
    margin:12px;
    display: inline-block;
`;

export function NoteCard({content}) {
    
    return (
        <NoteCardContainer>
            <p>{content}</p>
        </NoteCardContainer>
    );
}
