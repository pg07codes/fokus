import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import NewNoteModal from "./NewNoteModal";

const AddButtonContainer = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 10px;
    position: absolute;
    bottom: 25px;
    right: 25px;
    background-color: #fabb18;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);
    cursor: pointer;
`;

const AddIcon = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    svg {
        color: white;
        font-size: 2em;
        font-weight: bolder;
    }
`;

export function AddNoteButton() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <AddButtonContainer>
                <AddIcon onClick={() => setShowModal(true)}>
                    <AiOutlinePlus />
                </AddIcon>
            </AddButtonContainer>
            <NewNoteModal showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
