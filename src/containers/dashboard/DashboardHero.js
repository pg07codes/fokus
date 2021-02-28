import React from "react";
import styled from "styled-components";

const DashboardHeroContainer = styled.div`
    flex: 1 1 0;
    display: flex;
    align-items:center;
    justify-content:center;
    /* background-color: purple; */
`;

const DashboardHeroDiv = styled.div`
    display: flex;
    width: 85%;
    max-width:776px;
    height: 90%;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.3);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.3);
    border-radius: 20px;
`;

export function DashboardHero() {
    return (
        <DashboardHeroContainer>
            <DashboardHeroDiv />
        </DashboardHeroContainer>
    );
}
