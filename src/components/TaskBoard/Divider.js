import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { Flipped } from "react-flip-toolkit";

const DoneTasksDivider = styled.div`
    display: flex;
`;
const DividerLine = styled.div`
    width: 100%;
    position: relative;
    margin: 15px;
    border-bottom: 5px dashed #c0c0c0;
`;

const DividerIcon = styled.div`
    width: 50px;
    position: relative;
    top: 3px;
    color: #00a86b;
    svg {
        font-size: 2em;
    }
`;

export default function Divider() {
    return (
        <Flipped flipId={`-1`}>
            <DoneTasksDivider>
                <DividerLine />
                <DividerIcon>
                    <FaCheckCircle />
                </DividerIcon>
                <DividerLine />
            </DoneTasksDivider>
        </Flipped>
    );
}
