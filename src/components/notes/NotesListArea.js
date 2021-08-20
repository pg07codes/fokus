import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AddNoteButton } from "../../components/notes/AddNoteButton";
import EmptyNotes from "../../components/notes/NoNotes";
import { NoteCard } from "./../../components/notes/NoteCard";

const NotesListAreaContainer = styled.div`
    display: flex;
    flex:3 1 0;
    justify-content: center;
    align-content: center;
    overflow-y: auto;
    position: relative;
    margin-top: 20px;
`;

const NotesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 90%;
`;

export default function NotesListArea({setNoteInPreview}) {
    let notesArray = useSelector((state) => state.notes.notesArray);
    return (
        <NotesListAreaContainer>
            {notesArray.length !== 0 ? (
                <NotesDiv>
                    {notesArray.map((note) => (
                        <NoteCard setNoteInPreview={setNoteInPreview} note={note} />
                    ))}
                </NotesDiv>
            ) : (
                <EmptyNotes />
            )}
            <AddNoteButton />
        </NotesListAreaContainer>
    );
}
