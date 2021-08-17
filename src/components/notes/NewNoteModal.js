import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { create } from "./../../containers/notes/notesSlice";

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
    width: 560px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #fff;
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
    background-color: ${(p) => p.theme.backgroundSecondary};
    color: ${(p) => p.theme.primaryText};
    &:focus {
        outline: none;
    }
`;

const AddNoteActionButton = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
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
        margin: 3px;
        font-size: 0.75em;
    }
`;

export default function NewNoteModal({ showModal, setShowModal }) {
    const dispatch = useDispatch();
    const [noteContent, setNoteContent] = useState("");

    const handleNoteAddAction = (noteContent) => {
        dispatch(create(noteContent));
        setNoteContent("");
        setShowModal(false);
    };
    return (
        <>
            {showModal && (
                <ModalOverlay>
                    <AnimatePresence>
                        {showModal && (
                            <ModalBox
                                initial={{ opacity: 0, y: 60, scale: 0.5 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { type: "spring", stiffness: 300 },
                                }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.6 } }}
                            >
                                <CloseModalButton onClick={() => setShowModal(false)}>
                                    <AiOutlineClose />
                                </CloseModalButton>
                                <AddNoteInput type="text" autoFocus value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
                                <AddNoteActionButton onClick={() => handleNoteAddAction(noteContent)}>
                                    <p>Add Note</p>
                                </AddNoteActionButton>
                            </ModalBox>
                        )}
                    </AnimatePresence>
                </ModalOverlay>
            )}
        </>
    );
}
