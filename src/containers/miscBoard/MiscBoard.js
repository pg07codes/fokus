import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LabelPie } from "./../../components/MiscBoard/LabelPie";
import { ProgressRings } from "./../../components/MiscBoard/ProgressRings";
import {TimeProgressCard} from "./../../components/MiscBoard/TimeProgressCard";
import {TaskProgressCard} from "./../../components/MiscBoard/TaskProgressCard";

const MiscBoardContainer = styled.div`
    flex: 1 1 0;
    min-width: 346px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height:100%;
    /* background-color:orange; */
`;


const MainSummaryContainer = styled.div`
    display: flex;
    align-items:center;
    justify-content:space-around;
    width: 90%;
    max-width: 376px;
    height: 300px;
    margin: 10px 0;
    border-radius:20px;
    backface-visibility: hidden;
    transform: translateZ(0);
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

const LabelPieContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    max-width:220px;
    height: 200px;
    margin: 10px 0;
    border-radius: 10px;
    /* -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4); */
    background-color: #020202;
    transition:transform 0.2s ease-in-out ;
    &:hover {
        transform: scale(1.02);
    }
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
            </LabelPieContainer>
        </MiscBoardContainer>
    );
}
