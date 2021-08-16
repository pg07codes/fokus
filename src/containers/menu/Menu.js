import React from "react";
import styled from "styled-components";
import { MdDashboard, MdSettings } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { BiExclude , BiNotepad} from "react-icons/bi";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import logo from "./../../images/logo.svg";
import namedLogoLight from "./../../images/namedLogoDark.svg";

const MenuContainer = styled.div`
    width: 10%;
    max-width: 108px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #020202;
    border-radius: 0 10px 10px 0;
    border-left: 15px solid #fabb18;
    position: relative;
`;

const AppLogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    top: 25px;
    left: 5px;
    img {
        width: 60%;
    }
    /* background-color:pink; */
`;

const AppTextLogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 15px;
    img {
        width: 75%;
    }
    /* background-color:purple; */
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

const DummyMenuOptions = styled.div`
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
                <img src={logo} alt="logo" />
            </AppLogoContainer>
            <MenuOptions exact to="/">
                <MdDashboard data-tip="" data-for="dashboard" />
                <ReactTooltip id="dashboard" getContent={() => "Dashboard"} />
            </MenuOptions>

            <MenuOptions exact to="/notes">
                <BiNotepad data-tip="" data-for="notes" />
                <ReactTooltip id="notes" getContent={() => "Notes"} />
            </MenuOptions>

            <DummyMenuOptions>
                <BiExclude data-tip="" data-for="analytics" />
                <ReactTooltip id="analytics" getContent={() => "Coming Soon"} />
            </DummyMenuOptions>

            <MenuOptions exact to="/settings">
                <MdSettings data-tip="" data-for="settings" />
                <ReactTooltip id="settings" getContent={() => "Settings"} />
            </MenuOptions>

            <AppTextLogoContainer>
                <img src={namedLogoLight} alt="fokus" />
            </AppTextLogoContainer>
        </MenuContainer>
    );
}
