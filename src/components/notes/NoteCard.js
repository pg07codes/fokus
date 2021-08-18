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
    if (str.length <= 120) return str;
    else return str.substring(0, 120) + "...";
}

export function NoteCard({ note }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NoteCardContainer noteColor={note.color} onClick={() => setShowModal(true)}>
                <p>{previewNote(note.content)}</p>
            </NoteCardContainer>
            {showModal && <NoteModal isUpdateNoteModal={true} note={note} setShowModal={setShowModal} />}
        </>
    );
}
