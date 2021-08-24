import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NoteCard } from "./../../components/notes/NoteCard";
import { NewNoteButton } from "./NewNoteButton";
import NoteSearchInput from "./NoteSearchInput";
import emptyNotes from "./../../images/emptyNotes.svg";

const NotesListAreaContainer = styled.div`
    display: flex;
    flex: 3 1 0;
    flex-direction: column;
    align-content: center;
    overflow-y: auto;
    position: relative;
    margin: 20px 0 0 30px;
    background: ${(p) => `url(${p.background}) no-repeat center`};
    background-size: 400px;
`;

const NotesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 90%;
`;

export default function NotesListArea({ setNoteInPreview }) {
    const notesArray = useSelector((state) => state.notes.notesArray);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        if (searchQuery.trim().length >= 3) {
            setFilteredNotes(
                notesArray.filter((note) => {
                    if (note.content.trim().length === 0) return true;
                    else return note.content.toLowerCase().includes(searchQuery.toLowerCase().trim());
                })
            );
        } else {
            setFilteredNotes(notesArray);
        }
    }, [searchQuery, notesArray]);

    return (
        <NotesListAreaContainer background={emptyNotes}>
            <NoteSearchInput noSearchResults={filteredNotes.length === 0} setSearchQuery={setSearchQuery} />
            <NotesDiv>
                <NewNoteButton setNoteInPreview={setNoteInPreview} />
                {filteredNotes.map((note, idx) => (
                    <NoteCard key={idx} setNoteInPreview={setNoteInPreview} note={note} />
                ))}
            </NotesDiv>
        </NotesListAreaContainer>
    );
}
