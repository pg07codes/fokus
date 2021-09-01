import React from "react";
import styled from "styled-components";
import { getTimeDifferenceForNotes } from "../../helpers";

const NoteCardContainer = styled.div`
    width: ${(p) => (p.isGridView ? "215px" : "60%")};
    height: ${(p) => (p.isGridView ? "160px" : "110px")};
    margin: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border-radius: 12px;
    background-color: ${(p) => p.noteColor};
    filter: ${(p) => `brightness(${p.theme.brightness})`};
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
`;

const NoteCardContent = styled.div`
    display: inline-block;
    height: 80%;
    p {
        margin-right: 5px;
        margin-left: 15px;
        font-weight: bold;
        font-size: 0.9em;
    }
    word-wrap: break-word;
`;

const NoteCardStatus = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 20%;
    p {
        border-top: 1px solid grey;
        padding: 2px 10px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 0.7em;
    }
`;

function previewNote(str, isGridView) {
    if (isGridView) {
        let nextLineIdx = str.indexOf("\n");
        if (nextLineIdx !== -1) str = str.substring(0, nextLineIdx);
        if (str.length === 0) str = "New Note";
        if (str.length <= 90) return str;
        else return str.substring(0, 90) + "...";
    } else {
        if (str.length === 0) str = "New Note";
        if (str.length <= 160) return str;
        else return str.substring(0, 160) + "...";
    }
}

export function NoteCard({ note, setNoteInPreview, isGridView }) {
    return (
        <>
            <NoteCardContainer isGridView={isGridView} noteColor={note.color} onClick={() => setNoteInPreview(note)}>
                <NoteCardContent>
                    <p>{previewNote(note.content,isGridView)}</p>
                </NoteCardContent>

                <NoteCardStatus>
                    <p>
                        <i>updated {getTimeDifferenceForNotes(new Date(note.updatedAt).getTime(), new Date().getTime())}</i>
                    </p>
                </NoteCardStatus>
            </NoteCardContainer>
        </>
    );
}
