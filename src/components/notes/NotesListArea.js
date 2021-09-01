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
    overflow-y: auto;
    position: relative;
    margin: 20px 0 0 30px;
    background: ${(p) => `url(${p.background}) no-repeat center`};
    background-size: 400px;
`;

const NoteSearchDiv = styled.div`
    display: flex;
    width: 90%;
    justify-content: ${(p) => (p.isGridView ? "flex-start" : "center")};
`;

const NotesDiv = styled.div`
    display: flex;
    flex-direction: ${(p) => (p.isGridView ? "row" : "column")};
    flex-wrap: wrap;
    align-items: center;
    width: 90%;
`;

export default function NotesListArea({ setNoteInPreview }) {
    const notesArray = useSelector((state) => state.notes.notesArray);
    const isGridView = useSelector((state) => state.settings.isGridView);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        if (searchQuery.trim().length !== 0) {
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
            <NoteSearchDiv isGridView={isGridView}>
                <NoteSearchInput isGridView={isGridView} noSearchResults={notesArray.length !== 0 && filteredNotes.length === 0} setSearchQuery={setSearchQuery} />
            </NoteSearchDiv>
            <NotesDiv isGridView={isGridView}>
                <NewNoteButton isGridView={isGridView} setNoteInPreview={setNoteInPreview} />
                {filteredNotes.map((note, idx) => (
                    <NoteCard isGridView={isGridView} key={idx} setNoteInPreview={setNoteInPreview} note={note} />
                ))}
            </NotesDiv>
        </NotesListAreaContainer>
    );
}
