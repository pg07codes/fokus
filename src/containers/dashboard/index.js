import React from "react";
import styled from "styled-components";
import {DashboardHero} from "./DashboardHero";
import {DashboardMain} from "./DashboardMain";

const DashboardContainer = styled.div`
    flex: 2 1 0;
    display: flex;
    flex-direction: column;
    background-color:#FFFFF3;
`;

export default function Dashboard() {
    return (
        <DashboardContainer>
            <DashboardHero />
            <DashboardMain />
        </DashboardContainer>
    );
}
