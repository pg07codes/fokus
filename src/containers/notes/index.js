import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AddNoteButton } from "../../components/notes/AddNoteButton";
import EmptyNotes from "../../components/notes/NoNotes";
import { NoteCard } from "./../../components/notes/NoteCard";

const NotesContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    overflow-y: scroll;
    position: relative;
    margin-top: 20px;
`;

const NotesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 90%;
`;

export default function Notes() {
    let notesArray = useSelector((state) => state.notes.notesArray);

    return (
        <NotesContainer>
            {notesArray.length !== 0 ? (
                <NotesDiv>
                    {notesArray.map((note) => (
                        <NoteCard note={note} />
                    ))}
                </NotesDiv>
            ) : (
                <EmptyNotes />
            )}

            <AddNoteButton />
        </NotesContainer>
    );
}
