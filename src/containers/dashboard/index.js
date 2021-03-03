import React from "react";
import styled from "styled-components";
import { DashboardHero } from "./DashboardHero";
import { DashboardMain } from "./DashboardMain";

const DashboardContainer = styled.div`
    flex: 2 1 0;
    display: flex;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
    background-color: ${(p) => p.theme.backgroundMain};
    -webkit-box-shadow: 2px 0 5px -2px rgba(166, 173, 201, 0.8);
    box-shadow: 2px 0 5px -2px rgba(166, 173, 201, 0.8);
`;

export default function Dashboard() {
    return (
        <DashboardContainer>
            <DashboardHero />
            <DashboardMain />
        </DashboardContainer>
    );
}
