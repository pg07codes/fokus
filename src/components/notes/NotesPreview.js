import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { FaArrowRight, FaTrash, FaClipboard } from "react-icons/fa";
import { colorOptions, create, update, remove } from "../../containers/notes/notesSlice";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { AiFillEye } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";
import { debounce } from "./../../helpers";
import ReactTooltip from "react-tooltip";

const NotesPreviewContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    flex: 0 1 0;
    position: relative;
    border-left: solid 1px #fabb18;
    background-color: ${(p) => p.theme.backgroundSecondary};
`;

const NoteContentDiv = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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
    background-color: ${(p) => p.theme.backgroundSecondary};
    color: ${(p) => p.theme.primaryText};
    &::placeholder {
        color: #c1c1d7;
    }
    &:focus {
        outline: none;
    }
`;

const MarkdownWrapper = styled.div`
    padding: 20px 0 0 25px;
    color: ${(p) => p.theme.primaryText};
`;

const NoteActionMenu = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fabb18;
`;

const MenuActionButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const MenuActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
    svg {
        padding: 1px 10px;
        color: ${(p) => p.theme.primaryText};
        font-size: 1em;
    }
    &:hover {
        background-color: ${(p) => p.theme.backgroundSecondary};
    }
`;

const NoteColorSelectionBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    height: 100%;
    width: 180px;
    margin: 4px;
`;

const ColorOption = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${(p) => p.color};
    background-clip: content-box;
    padding: 2px;
    margin: 0 3px;
    border: ${(p) => (p.isSelected ? "3px solid black" : "")};
`;

const debouncedUpdateNoteContent = debounce((dispatch, id, updatedNoteContent) => {
    dispatch(update({ id: id, noteContent: updatedNoteContent.trim() }));
}, 1000);

export default function NotesPreview({ note, setNoteInPreview }) {
    const dispatch = useDispatch();
    const [editNote, setEditNote] = useState();
    const [noteContent, setNoteContent] = useState();
    const [noteColor, setNoteColor] = useState();

    useEffect(() => {
        if (note !== null) {
            setNoteContent(note.content);
            setNoteColor(note.color);
            setEditNote(true);
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

    const handleCloseAction = () => {
        dispatch(remove(null)); // clears all empty body notes
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
                {note !== null && (
                    <>
                        <NoteActionMenu>
                            <MenuActionButtonGroup>
                                <MenuActionButton onClick={() => handleCloseAction()}>
                                    <FaArrowRight data-for="closeAction" data-tip="" />
                                    <ReactTooltip id="closeAction" getContent={() => "Close Note"} />
                                </MenuActionButton>
                                <MenuActionButton data-for="viewOrEditAction" data-tip="" onClick={() => setEditNote(!editNote)}>
                                    {editNote ? <AiFillEye /> : <RiFileEditFill />}
                                    <ReactTooltip id="viewOrEditAction" getContent={() => (editNote ? "View Markdown" : "Edit Note")} />
                                </MenuActionButton>
                                <MenuActionButton onClick={() => navigator.clipboard.writeText(noteContent)}>
                                    <FaClipboard data-for="copyAction" data-tip="" />
                                    <ReactTooltip id="copyAction" getContent={() => "Copy Note"} />
                                </MenuActionButton>

                                <MenuActionButton onClick={() => handleDeleteNoteAction(note.id)}>
                                    <FaTrash data-for="deleteAction" data-tip="" />
                                    <ReactTooltip id="deleteAction" getContent={() => "Delete Note"} />
                                </MenuActionButton>
                            </MenuActionButtonGroup>
                            <NoteColorSelectionBox>
                                {Object.keys(colorOptions).map((color, idx) => (
                                    <ColorOption
                                        key={idx}
                                        onClick={() => handleColorUpdate(note, colorOptions[color])}
                                        isSelected={noteColor === colorOptions[color]}
                                        color={colorOptions[color]}
                                    />
                                ))}
                            </NoteColorSelectionBox>
                        </NoteActionMenu>
                        <NoteContentDiv>
                            {editNote ? (
                                <EditNoteInput
                                    placeholder="Type note here.."
                                    autoFocus
                                    type="text"
                                    value={noteContent}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                />
                            ) : (
                                <MarkdownWrapper>
                                    <ReactMarkdown children={noteContent} />
                                </MarkdownWrapper>
                            )}
                        </NoteContentDiv>
                    </>
                )}
            </NotesPreviewContainer>
        </AnimatePresence>
    );
}
