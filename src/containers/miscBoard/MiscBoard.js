import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Soundscapes } from "../../components/MusicBox/Soundscapes";
import { LabelPie } from "./../../components/FocusBoard/LabelPie";
import { ProgressRings } from "./../../components/MiscBoard/ProgressRings";

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
    width: 320px;
    height: 180px;
    margin: 20px;
    border-radius: 10px;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    background-color: #f7f7fa;
`;

const LabelPieContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    margin: 20px;
    border-radius: 10px;
    /* -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4); */
    background-color:#f7f7fa;
`;

const AboutLabelPie = styled.div`
    width: 100%;
    color:#c1c1d7;
    p {
        float: right;
        font-size: 0.7em;
        font-weight: bold;
        margin:0;
    }
`;

const ProgressRingContainer = styled.div`
    display: flex;
    width: 346px;
    height: 180px;
    margin: 20px;
    border-radius: 10px;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    background-color: #f7f7fa;
`;

export function MiscBoard() {
    return (
        <MiscBoardContainer>
            <ProgressRingContainer>
                <ProgressRings />
            </ProgressRingContainer>
            <LabelPieContainer>
                <LabelPie />
                <AboutLabelPie>
                    <p>
                        task/label
                        <br />
                        distribution
                    </p>
                </AboutLabelPie>
            </LabelPieContainer>
            <MusicBoxContainer>
                <Soundscapes />
            </MusicBoxContainer>
        </MiscBoardContainer>
    );
}
