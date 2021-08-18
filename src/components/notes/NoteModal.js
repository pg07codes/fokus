import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { colorOptions, create, update, remove } from "../../containers/notes/notesSlice";

import { motion } from "framer-motion";

const ModalOverlay = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled(motion.div)`
    position: relative;
    z-index: 2;
    width: 648px;
    height: 456px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    background: ${(p) => p.noteColor};
`;

const CloseModalButton = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        color: #fabb18;
        font-size: 1.6em;
        font-weight: bolder;
    }
`;

const AddNoteInput = styled.textarea`
    resize: none;
    height: 75%;
    width: 75%;
    font-size: 1.2em;
    vertical-align: center;
    font-weight: bold;
    border: none;
    outline: none;
    margin: 20px;
    background-color: ${(p) => p.noteColor};
    color: ${(p) => p.theme.primaryText};
    &:focus {
        outline: none;
    }
`;

const SubmitModalAction = styled.div`
    position: absolute;
    right: 8px;
    bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 80px;
    border-radius: 5px;
    margin: 4px;
    cursor: pointer;
    color: ${(p) => p.theme.primaryText};
    &:hover {
        background-color: #fabb18;
        p {
            color: ${(p) => p.theme.secondaryText};
        }
    }
    p {
        margin: 2px;
        font-size: 0.75em;
    }
`;

const DeleteAction = styled.div`
    position: absolute;
    right: 100px;
    bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 80px;
    border-radius: 5px;
    margin: 4px;
    cursor: pointer;
    color: ${(p) => p.theme.primaryText};
    &:hover {
        background-color: #fabb18;
        p {
            color: ${(p) => p.theme.secondaryText};
        }
    }
    p {
        margin: 2px;
        font-size: 0.75em;
    }
`;

const NoteColorSelectionBox = styled.div`
    position: absolute;
    left: 8px;
    bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    height: 40px;
    width: 220px;
    margin: 4px;
    background-color: ${(p) => p.theme.backgroundSecondary};
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

export default function NoteModal({ isUpdateNoteModal, note, setShowModal }) {
    const dispatch = useDispatch();

    const [noteContent, setNoteContent] = useState(isUpdateNoteModal ? note.content : "");
    const [noteColor, setNoteColor] = useState(isUpdateNoteModal ? note.color : colorOptions.white);

    const meta = useSelector((state) => state.tasks.meta);

    const handleSubmitModalAction = () => {
        if (noteContent.trim().length >= 1) {
            if (isUpdateNoteModal) {
                dispatch(update({ id: note.id, noteContent, noteColor }));
            } else {
                let newNote = {
                    id: Math.floor(Math.random() * 10000),
                    globalKey: meta.globalKey,
                    content: noteContent,
                    color: noteColor,
                };
                dispatch(create(newNote));
            }
            setShowModal(false);
        }
    };

    const handleColorUpdate = (note, noteColor) => {
        if (isUpdateNoteModal) {
            let updatePayload = {
                id: note.id,
                noteColor,
                noteContent: note.content,
            };
            dispatch(update(updatePayload));
        }
        setNoteColor(noteColor);
    };

    const handleDeleteNoteAction = (id) => {
        dispatch(remove(note.id));
        setShowModal(false);
    };

    return (
        <ModalOverlay>
            <AnimatePresence>
                <ModalBox
                    initial={{ opacity: 0, y: 60, scale: 0.5 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    noteColor={noteColor}
                >
                    <CloseModalButton onClick={() => setShowModal(false)}>
                        <AiOutlineClose />
                    </CloseModalButton>
                    <AddNoteInput type="text" autoFocus value={noteContent} noteColor={noteColor} onChange={(e) => setNoteContent(e.target.value)} />
                    <NoteColorSelectionBox>
                        {Object.keys(colorOptions).map((color) => (
                            <ColorOption
                                onClick={() => handleColorUpdate(note, colorOptions[color])}
                                isSelected={noteColor === colorOptions[color]}
                                color={colorOptions[color]}
                            />
                        ))}
                    </NoteColorSelectionBox>
                    {isUpdateNoteModal && (
                        <DeleteAction onClick={() => handleDeleteNoteAction(note.id)}>
                            <p>Delete</p>
                        </DeleteAction>
                    )}
                    <SubmitModalAction onClick={handleSubmitModalAction}>{isUpdateNoteModal ? <p>Update</p> : <p>Add Note</p>}</SubmitModalAction>
                </ModalBox>
            </AnimatePresence>
        </ModalOverlay>
    );
}
