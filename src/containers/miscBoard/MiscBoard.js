import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Soundscapes } from "../../components/musicBox/Soundscapes";
import { LabelPie } from "./../../components/FocusBoard/LabelPie";

const MiscBoardContainer = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const MusicBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 276px;
    height: 160px;
    margin: 20px;
    border-radius: 10px;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    background-color: #f7f7fa;
`;

const LabelPieContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 160px;
    height: 160px;
    margin: 20px;
    border-radius: 10px;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    background-color: #f7f7fa;
`;

export function MiscBoard() {
    return (
        <MiscBoardContainer>
            <LabelPieContainer>
                <div style={{ width: 120 }}>
                    <LabelPie />
                </div>
            </LabelPieContainer>
            <MusicBoxContainer>
                <Soundscapes />
            </MusicBoxContainer>
        </MiscBoardContainer>
    );
}
