import React from "react";
import styled from "styled-components";
import WIP from "./../../images/WIP.svg";

const MenuContainer = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:#FABB18;
`;

export function Menu() {
    return (
        <MenuContainer>
            <img src={WIP} style={{ height: 100, width: 100 }} alt="work in progress"></img>
            <div>
                <h4 style={{ textAlign: "center", letterSpacing: 3, color: "#f7f7fa" }}>This is a prototype. currently under development.</h4>
            </div>
        </MenuContainer>
    );
}
