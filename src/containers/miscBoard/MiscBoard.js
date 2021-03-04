import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LabelPie } from "./../../components/MiscBoard/LabelPie";
import { ProgressRings } from "./../../components/MiscBoard/ProgressRings";
import { TimeProgressCard } from "./../../components/MiscBoard/TimeProgressCard";
import { TaskProgressCard } from "./../../components/MiscBoard/TaskProgressCard";
import { getTodaysQuote } from "./../../helpers/quotes";

const MiscBoardContainer = styled.div`
    flex: 1 1 0;
    min-width: 346px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    /* background-color:orange; */
`;

const MainSummaryContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    max-width: 326px;
    height: 226px;
    margin: 10px 0;
    border-radius: 20px;
    background-color:${p=>p.theme.backgroundSecondary};
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    /* backface-visibility: hidden;
    transform: translateZ(0);
    transition: box-shadow 0.2s ease-in-out,transform 0.2s ease-in-out ;
    &:hover {
        transform: scale(1.02);
        -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.8);
        box-shadow: 0 2px 10px rgba(166, 173, 201, 0.8);
    } */
`;

const ProgressRingContainer = styled.div`
    display: flex;
    width: 50%;
    height: 95%;
    border-radius: 10px;
    /* -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);*/
    /* background-color: #f7f7fa;  */
`;

const ProgressCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: 95%;
    border-radius: 10px;
    /* -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    background-color: #f7adfa; */
`;

const QuoteAndLabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    max-width: 326px;
    height: 186px;
    margin: 10px 0;
    /* background-color: purple; */
`;

const LabelPieContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 90%;
    border-radius: 10px;
    background-color:${p=>p.theme.backgroundSecondary};
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);
`;

function getQuoteFontSize(letterCount){
    let size = -0.0035*letterCount+1.3; // eqn of line with 40 - 1.1em and 180 - 0.6em
    size = size.toPrecision(3);
    return `${size}em`
}
const QuoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    border-radius: 10px;
    position: relative;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    font-weight: bold;
    color:${p=>p.theme.primaryText};
    p {
        margin: 0 3px;
        font-size: ${p=>getQuoteFontSize(p.length)};
        &::before{
            color:#fabb18;
            content:"“ ";
        }
        &::after{
            color:#fabb18;
            content:" ”";
        }
    }
    span {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 5px;
        font-size: 0.65em;
        color:#fabb18;
    }
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.2);
    }
`;

export function MiscBoard() {

    let todaysQuote = getTodaysQuote();
    return (
        <MiscBoardContainer>
            <MainSummaryContainer>
                <ProgressRingContainer>
                    <ProgressRings />
                </ProgressRingContainer>
                <ProgressCardContainer>
                    <TaskProgressCard />
                    <TimeProgressCard />
                </ProgressCardContainer>
            </MainSummaryContainer>

            <QuoteAndLabelContainer>
                <QuoteContainer length={todaysQuote.length}>
                    <p>
                        {todaysQuote.quote}
                    </p>
                    <span>&mdash; {todaysQuote.author} </span>
                </QuoteContainer>
                <LabelPieContainer>
                    <LabelPie />
                </LabelPieContainer>
            </QuoteAndLabelContainer>
        </MiscBoardContainer>
    );
}
