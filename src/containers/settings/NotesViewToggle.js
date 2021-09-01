import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setGridView } from "./settingsSlice";
import { FaThList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

const NotesViewDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 70px;
    background-color: ${(p) => p.theme.backgroundSecondary};
    p {
        margin: 0;
    }
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    svg{
        cursor: pointer;
        margin:3px;
        font-size: 1.2em;
    }
    #list-view-opt {
        color: ${(p) => (p.isGridView ? p.theme.primaryText : "#fabb18")};
    }
    #grid-view-opt {
        color: ${(p) => (p.isGridView ? "#fabb18" : p.theme.primaryText)};
    }
`;

export function NotesViewToggle() {
    const isGridView = useSelector((s) => s.settings.isGridView);
    const dispatch = useDispatch();

    return (
        <NotesViewDiv>
            <p>Notes View Layout</p>
            <Options isGridView={isGridView}>
                <FaThList id="list-view-opt" data-for="list-view" data-tip="" onClick={() => {console.log('fd');dispatch(setGridView(false))}} />
                <BsFillGrid3X3GapFill id="grid-view-opt" data-for="grid-view" data-tip="" onClick={() => dispatch(setGridView(true))} />
                <ReactTooltip id="list-view" getContent={() => "List View"} />
                <ReactTooltip id="grid-view" getContent={() => "Grid View"} />
            </Options>
        </NotesViewDiv>
    );
}
