import React from "react";
import styled from "styled-components";
import { MdDashboard, MdSettings } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { BiExclude } from "react-icons/bi";

import { NavLink } from "react-router-dom";

import ReactTooltip from "react-tooltip";

const MenuContainer = styled.div`
    width: 10%;
    max-width: 128px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #020202;
    border-radius: 0 15px 15px 0;
    border-left: 15px solid #fabb18;
`;

const activeClassName = "nav-item-active";

const MenuOptions = styled(NavLink).attrs({ activeClassName })`
    display: flex;
    justify-content: center;
    margin: 10px 0;
    border-radius: 0 5px 5px 0;
    background-color: #020202;
    svg {
        font-size: 1.8em;
        color: #fff;
        margin: 5px 0;
    }
    &.${activeClassName} {
        svg{
            color:#fabb18;
        }
    }
    width:80%;
    transition:width 0.2s;
    &:hover{
        width:90%;
        background-color: #fabb18;
    }
`;

export function Menu() {
    return (
        <MenuContainer>
            <MenuOptions exact to="/">
                <MdDashboard data-tip="" data-for="dashboard" />

                <ReactTooltip id="dashboard" getContent={() => "Dashboard"} />
            </MenuOptions>

            <MenuOptions exact to="/analytics" >
                <IoMdAnalytics data-tip="" data-for="analytics" />
                <ReactTooltip id="analytics" getContent={() => "Coming Soon"} />
            </MenuOptions>

            <MenuOptions exact to="/notes" >
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
