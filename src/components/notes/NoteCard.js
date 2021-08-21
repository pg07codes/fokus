import React, { useState } from "react";
import styled from "styled-components";
import NoteModal from "./NoteModal";

const NoteCardContainer = styled.div`
    width: 220px;
    height: 160px;
    margin: 15px;
    display: inline-block;
    cursor: pointer;
    border-radius: 12px;
    background-color: ${(p) => p.noteColor};
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    p {
        margin: 15px;
        font-size: 0.9em;
    }
    word-wrap: break-word;
`;

function previewNote(str) {
    let nextLineIdx = str.indexOf("\n");
    if (nextLineIdx !== -1) str = str.substring(0, nextLineIdx);
    if (str.length === 0) str = "Untitled Note";
    if (str.length <= 90) return str;
    else return str.substring(0, 90) + "...";
}

export function NoteCard({ note, setNoteInPreview }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NoteCardContainer noteColor={note.color} onClick={() => setNoteInPreview(note)}>
                <p>{previewNote(note.content)}</p>
            </NoteCardContainer>
            {showModal && <NoteModal isUpdateNoteModal={true} note={note} setShowModal={setShowModal} />}
        </>
    );
}
