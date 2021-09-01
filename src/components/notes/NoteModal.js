// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import { AnimatePresence } from "framer-motion";
// import { AiOutlineClose } from "react-icons/ai";
// import { colorOptions, create } from "../../containers/notes/notesSlice";

// import { motion } from "framer-motion";

// const ModalOverlay = styled.div`
//     position: fixed;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.6);
// `;

// const ModalBox = styled(motion.div)`
//     position: relative;
//     z-index: 2;
//     width: 696px;
//     height: 456px;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     flex-direction: column;
//     border-radius: 10px;
//     background: ${(p) => p.noteColor};
// `;

// const CloseModalButton = styled.div`
//     position: absolute;
//     top: 8px;
//     right: 8px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//     svg {
//         transition: transform 1s;
//         color: ${(p) => p.theme.primaryText};
//         font-size: 1.2em;
//         font-weight: 700;
//         &:hover {
//             transform: rotate(180deg);
//         }
//     }
// `;

// const AddNoteInput = styled.textarea`
//     resize: none;
//     height: 70%;
//     width: 85%;
//     font-size: 1.2em;
//     vertical-align: center;
//     font-weight: bold;
//     border: none;
//     outline: none;
//     background-color: ${(p) => p.noteColor};
//     &:focus {
//         outline: none;
//     }
// `;

// const ModalActionArea = styled.div`
//     height: 10%;
//     width: 85%;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// `;

// const ModalActionDiv = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

// const ModalActionButton = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 35px;
//     width: 90px;
//     border-radius: 5px;
//     margin: 4px;
//     cursor: pointer;
//     &:hover {
//         background-color: #fabb18;
//         p {
//             color: #fff;
//         }
//     }
//     p {
//         margin: 2px;
//         font-weight: bold;
//         font-size: 0.8em;
//     }
// `;

// const NoteColorSelectionBox = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 8px;
//     height: 40px;
//     width: 180px;
//     margin: 4px;
//     background-color: rgba(0, 0, 0, 0.1);
// `;

// const ColorOption = styled.div`
//     display: inline-block;
//     width: 25px;
//     height: 25px;
//     border-radius: 50%;
//     background-color: ${(p) => p.color};
//     background-clip: content-box;
//     padding: 2px;
//     margin: 0 3px;
//     border: ${(p) => (p.isSelected ? "3px solid black" : "")};
// `;

// export default function NoteModal({ setShowModal }) {
//     const dispatch = useDispatch();

//     const [noteContent, setNoteContent] = useState("");
//     const [noteColor, setNoteColor] = useState(colorOptions.white);

//     const meta = useSelector((state) => state.tasks.meta);

//     const handleSubmitModalAction = () => {
//         if (noteContent.trim().length >= 1) {
//             let newNote = {
//                 id: Math.floor(Math.random() * 10000),
//                 globalKey: meta.globalKey,
//                 content: noteContent.trim(),
//                 color: noteColor,
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//             };
//             dispatch(create(newNote));

//             setShowModal(false);
//         }
//     };

//     return (
//         <ModalOverlay>
//             <AnimatePresence>
//                 <ModalBox
//                     initial={{ opacity: 0, y: 60, scale: 0.5 }}
//                     animate={{
//                         opacity: 1,
//                         y: 0,
//                         scale: 1,
//                     }}
//                     noteColor={noteColor}
//                 >
//                     <CloseModalButton onClick={() => setShowModal(false)}>
//                         <AiOutlineClose />
//                     </CloseModalButton>
//                     <AddNoteInput type="text" autoFocus value={noteContent} noteColor={noteColor} onChange={(e) => setNoteContent(e.target.value)} />
//                     <ModalActionArea>
//                         <ModalActionDiv>
//                             <ModalActionButton onClick={handleSubmitModalAction}>
//                                 <p>Add Note</p>
//                             </ModalActionButton>
//                         </ModalActionDiv>
//                         <NoteColorSelectionBox>
//                             {Object.keys(colorOptions).map((color) => (
//                                 <ColorOption
//                                     onClick={() => setNoteColor(colorOptions[color])}
//                                     isSelected={noteColor === colorOptions[color]}
//                                     color={colorOptions[color]}
//                                 />
//                             ))}
//                         </NoteColorSelectionBox>
//                     </ModalActionArea>
//                 </ModalBox>
//             </AnimatePresence>
//         </ModalOverlay>
//     );
// }
