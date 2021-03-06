import React from "react";
import styled from "styled-components";
import betaLogoLight from "./../../images/betaLogoLight.svg";
import betaLogoDark from "./../../images/betaLogoDark.svg";
import { DayDate } from "./../../components/dashBoard/DayDate";
import { useSelector } from "react-redux";

const DashboardHeroContainer = styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: purple; */
`;

const DashboardHeroDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    max-width: 736px;
    height: 85%;
    img {
        width: 45%;
    }
`;

export function DashboardHero(p) {
    const darkTheme = useSelector((s) => s.settings.darkTheme);
    return (
        <DashboardHeroContainer>
            <DashboardHeroDiv>
                <img src={darkTheme?betaLogoDark:betaLogoLight} alt="fokus" />
                <DayDate />
            </DashboardHeroDiv>
        </DashboardHeroContainer>
    );
}
