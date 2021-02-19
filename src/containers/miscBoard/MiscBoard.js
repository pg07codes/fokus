import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LabelPie } from "./../../components/FocusBoard/LabelPie";
import { ProgressRings } from "./../../components/MiscBoard/ProgressRings";
import {TimeProgressCard} from "./../../components/MiscBoard/TimeProgressCard";
import {TaskProgressCard} from "./../../components/MiscBoard/TaskProgressCard";

const MiscBoardContainer = styled.div`
    flex: 2 1 0;
    min-width:426px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
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
    background-color: #f7f7fa;
`;

const AboutLabelPie = styled.div`
    width: 100%;
    color: #c1c1d7;
    p {
        float: right;
        font-size: 0.7em;
        font-weight: bold;
        margin: 0;
    }
`;

const MainSummaryContainer = styled.div`
    display: flex;
    align-items:center;
    justify-content:space-around;
    width: 80%;
    max-width:400px;
    height: 326px;
    margin: 20px;
    border-radius:20px;
    transition: box-shadow 0.2s ease-in-out,transform 0.2s ease-in-out ;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.3);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.3);
    &:hover {
        transform: scale(1.02);
        -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.8);
        box-shadow: 0 2px 10px rgba(166, 173, 201, 0.8);
    }
`;

const ProgressRingContainer = styled.div`
    display: flex;
    width: 45%;
    height: 85%;
    border-radius: 10px;
    /* -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    background-color: #f7f7fa; */
`;

const ProgressCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 35%;
    height: 85%;
    border-radius: 10px;
    /* -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4); */
    /* background-color: #f7adfa; */
`;

export function MiscBoard() {
    return (
        <MiscBoardContainer>
            <MainSummaryContainer>
                <ProgressRingContainer>
                    <ProgressRings />
                </ProgressRingContainer>
                <ProgressCardContainer>
                    <TaskProgressCard/>
                    <TimeProgressCard/>
                </ProgressCardContainer>
            </MainSummaryContainer>

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
        </MiscBoardContainer>
    );
}
