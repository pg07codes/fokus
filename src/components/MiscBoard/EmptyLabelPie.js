import React from "react";
import ReactTooltip from "react-tooltip";
import { AiOutlinePieChart } from "react-icons/ai";
import styled from "styled-components";

const EmptyLabelPieDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    svg {
        color: #020202;
        font-size: 5.6em;
    }
    /* background-color:pink; */
`;

export function EmptyLabelPie() {
    return (
        <EmptyLabelPieDiv data-tip="" data-for="EmptyLabelPie">
            <AiOutlinePieChart />
            <ReactTooltip id="EmptyLabelPie" getContent={() => "Tasks/Labels Pie"} />
        </EmptyLabelPieDiv>
    );
}
