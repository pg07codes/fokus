import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { colorOptions, create, update, remove } from "../../containers/notes/notesSlice";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { VscMarkdown } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { debounce } from "./../../helpers";
import { BiTrash } from "react-icons/bi";

const NotesPreviewContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    flex: 0 1 0;
    position: relative;
    border-left: solid 2px #fabb18;
`;

const NoteActionMenu = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: grey;
`;

const NoteContentDiv = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: #fff;
`;

const EditNoteInput = styled.textarea`
    resize: none;
    height: 100%;
    padding: 20px 0 0 25px;
    font-size: 1em;
    font-family: monospace;
    vertical-align: center;
    border: none;
    outline: none;
    color: ${(p) => p.theme.primaryText};
    &:focus {
        outline: none;
    }
`;

const MenuActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        color: ${(p) => p.theme.primaryText};
        font-size: 1.6em;
        font-weight: 900;
    }
`;

const NoteColorSelectionBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    height: 40px;
    width: 220px;
    margin: 4px;
    background-color: ${(p) => p.theme.backgroundSecondary};
    background-color: #e6e6e6;
`;

const ColorOption = styled.div`
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${(p) => p.color};
    background-clip: content-box;
    padding: 2px;
    margin: 0 3px;
    border: ${(p) => (p.isSelected ? "3px solid black" : "")};
`;

const debouncedUpdateNoteContent = debounce((dispatch, id, updatedNoteContent) => {
    dispatch(update({ id: id, noteContent: updatedNoteContent }));
}, 600);

export default function NotesPreview({ note, setNoteInPreview }) {
    const dispatch = useDispatch();
    const [editNote, setEditNote] = useState(true);
    const [noteContent, setNoteContent] = useState();
    const [noteColor, setNoteColor] = useState();

    useEffect(() => {
        if (note != null) {
            setNoteContent(note.content);
            setNoteColor(note.color);
            setEditNote(false);
        }
    }, [note]);

    const handleContentChange = (updatedNoteContent) => {
        setNoteContent(updatedNoteContent);
        debouncedUpdateNoteContent(dispatch, note.id, updatedNoteContent);
    };

    const handleColorUpdate = (note, noteColor) => {
        let updatePayload = {
            id: note.id,
            noteColor,
        };
        dispatch(update(updatePayload));
        setNoteColor(noteColor);
    };

    const handleDeleteNoteAction = (id) => {
        dispatch(remove(id));
        setNoteInPreview(null);
    };

    return (
        <AnimatePresence>
            <NotesPreviewContainer
                initial={{
                    flex: note === null ? "0 1 0" : "2 1 0",
                }}
                animate={{
                    flex: note === null ? "0 1 0" : "2 1 0",
                }}
            >
                {note != null && (
                    <>
                        <NoteActionMenu>
                            <MenuActionButton onClick={() => setEditNote(!editNote)}>{editNote ? <VscMarkdown /> : <FiEdit />}</MenuActionButton>
                            <NoteColorSelectionBox>
                                {Object.keys(colorOptions).map((color) => (
                                    <ColorOption
                                        onClick={() => handleColorUpdate(note, colorOptions[color])}
                                        isSelected={noteColor === colorOptions[color]}
                                        color={colorOptions[color]}
                                    />
                                ))}
                            </NoteColorSelectionBox>
                            <MenuActionButton onClick={() => handleDeleteNoteAction(note.id)}>
                                <BiTrash />
                            </MenuActionButton>
                            <MenuActionButton onClick={() => setNoteInPreview(null)}>
                                <AiOutlineClose />
                            </MenuActionButton>
                        </NoteActionMenu>
                        <NoteContentDiv>
                            {editNote ? (
                                <EditNoteInput type="text" value={noteContent} onChange={(e) => handleContentChange(e.target.value)} />
                            ) : (
                                <div style={{ padding: "20px 0 0 25px" }}>
                                    <ReactMarkdown>{noteContent}</ReactMarkdown>
                                </div>
                            )}
                        </NoteContentDiv>
                    </>
                )}
            </NotesPreviewContainer>
        </AnimatePresence>
    );
}
