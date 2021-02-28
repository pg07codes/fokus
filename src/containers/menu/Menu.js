import React from "react";
import styled from "styled-components";
import { MdDashboard, MdSettings } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { BiExclude } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import logo  from "./../../images/logo.svg";

const MenuContainer = styled.div`
    width: 10%;
    max-width: 108px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #020202;
    border-radius: 0 15px 15px 0;
    border-left: 15px solid #fabb18;
    position:relative;
`;

const AppLogoContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    width:100%;
    top:20px;
    right:0;
    img{
        width:60%;
    }
    /* background-color:white; */
`;

const activeClassName = "nav-item-active";
const MenuOptions = styled(NavLink).attrs({ activeClassName })`
    display: flex;
    justify-content: center;
    margin: 7px 0;
    border-radius: 0 5px 5px 0;
    background-color: #020202;
    svg {
        font-size: 1.8em;
        color: #fff;
        margin: 10px 0;
    }
    &.${activeClassName} {
        svg {
            color: #fabb18;
        }
    }
    width: 100%;
    transition: width 0.2s;
    &:hover {
        svg {
            color: #fff;
        }
        width: 125%;
        background-color: #fabb18;
    }
`;

export function Menu() {
    return (
        <MenuContainer>
            <AppLogoContainer>
                <img src={logo} alt="logo"/>
            </AppLogoContainer>
            <MenuOptions exact to="/">
                <MdDashboard data-tip="" data-for="dashboard" />

                <ReactTooltip id="dashboard" getContent={() => "Dashboard"} />
            </MenuOptions>

            <MenuOptions exact to="/analytics">
                <IoMdAnalytics data-tip="" data-for="analytics" />
                <ReactTooltip id="analytics" getContent={() => "Coming Soon"} />
            </MenuOptions>

            <MenuOptions exact to="/notes">
                <BiExclude data-tip="" data-for="notes" />
                <ReactTooltip id="notes" getContent={() => "Coming Soon"} />
            </MenuOptions>

            <MenuOptions exact to="/settings">
                <MdSettings data-tip="" data-for="settings" />
                <ReactTooltip id="settings" getContent={() => "Settings"} />
            </MenuOptions>
        </MenuContainer>
    );
}
