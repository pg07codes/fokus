import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AddNoteButton } from "../../components/notes/AddNoteButton";
import EmptyNotes from "../../components/notes/NoNotes";
import { NoteCard } from "./../../components/notes/NoteCard";
import NotesListArea from "./../../components/notes/NotesListArea";
import NotesPreview from "./../../components/notes/NotesPreview";

const NotesContainer = styled.div`
    display: flex;
    width: 100%;
`;

export default function Notes() {
    let [noteInPreview, setNoteInPreview] = useState(null);
    return (
        <NotesContainer>
            <NotesListArea setNoteInPreview={setNoteInPreview}/>
            <NotesPreview setNoteInPreview={setNoteInPreview} note={noteInPreview} />
        </NotesContainer>
    );
}
