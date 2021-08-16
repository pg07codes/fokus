import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {NoteCard} from "./../../components/notes/NoteCard"

const NotesContainer = styled.div`
    display:flex;
    justify-content: center;
    align-content: center;
    width:100%;
    overflow-y: scroll;
`;

const NotesDiv = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width:90%;
`;

export default function Notes() {

    let notesArray = useSelector((state)=>state.notes.notesArray);

    return (
        <NotesContainer>
            <NotesDiv>
            {notesArray.map(i=>(<NoteCard content={i}/>))}
           {notesArray.map(i=>(<NoteCard content={i}/>))}
            </NotesDiv>
        </NotesContainer>
    );
}
