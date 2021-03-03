import React from "react";
import { AiOutlinePieChart } from "react-icons/ai";
import styled from "styled-components";

const EmptyLabelPieDiv = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    width: 100%;
    text-align:right;
    color:${p=>p.theme.primaryText};
    svg {
        font-size: 5.6em;
    }
    p{
        margin:0;
        font-size:0.6em;
        font-weight:bold;
    }
    /* background-color:pink; */
`;

export function EmptyLabelPie() {
    return (
        <EmptyLabelPieDiv data-tip="" data-for="EmptyLabelPie">
            <AiOutlinePieChart />
            <p>Tasks/Labels Pie</p>
        </EmptyLabelPieDiv>
    );
}
