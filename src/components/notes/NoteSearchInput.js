import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const NoteSearchContainer = styled.div`
    display: flex;
    margin: 15px;
    min-height: 50px;
`;

const NoteSearchInputDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    height: 100%;
    border-radius: 12px;
    background-color: ${(p) => p.theme.backgroundSecondary};
    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.3);
    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.3);
    svg {
        color: #fabb18;
    }
    border: ${(p) => (p.noSearchResults ? "red 1px solid" : "")};
`;

const SearchNoteInput = styled.input`
    height: 90%;
    width: 75%;
    font-size: 0.9em;
    background-color: ${(p) => p.theme.backgroundSecondary};
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
        font-size:0.9em;
        color: red;
    }
`;

export default function NoteSearchInput({ setSearchQuery, noSearchResults }) {
    return (
        <NoteSearchContainer>
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
