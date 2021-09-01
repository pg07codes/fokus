import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const NoteSearchContainer = styled.div`
    display: flex;
    justify-content: ${(p) => (p.isGridView ? "flex-start" : "center")};
    margin: 15px 15px 30px 15px;
    min-height: 45px;
    width:85%;
    /* background-color: pink; */
`;

const NoteSearchInputDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    height: 100%;
    border-bottom: ${(p) => p.noSearchResults ? "2px solid red" : `2px solid ${p.theme.primaryText}`};
    svg {
        color: #fabb18;
    }
`;

const SearchNoteInput = styled.input`
    height: 95%;
    width: 75%;
    font-size: 0.9em;
    background-color: ${(p) => p.theme.body};
    color: ${(p) => p.theme.primaryText};
    border: 0;
    outline: none;
    font-weight: bold;
    &::placeholder {
        color: #c1c1d7;
        font-weight: normal;
    }
`;

const NoSearchResultFeedback = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 15%;
    height: 90%;
    span {
        font-size: 0.8em;
        color: red;
    }
`;

export default function NoteSearchInput({ setSearchQuery, noSearchResults ,isGridView }) {
    return (
        <NoteSearchContainer isGridView={isGridView}>
            <NoteSearchInputDiv noSearchResults={noSearchResults}>
                <FaSearch />
                <SearchNoteInput type="text" placeholder="Search here.." onChange={(e) => setSearchQuery(e.target.value)} />
                <NoSearchResultFeedback>
                    <span>{noSearchResults && "no results"}</span>
                </NoSearchResultFeedback>
            </NoteSearchInputDiv>
        </NoteSearchContainer>
    );
}
