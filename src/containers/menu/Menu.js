import React from "react";
import styled from "styled-components";
import WIP from "./../../images/WIP.svg";

const MenuContainer = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:#0000cd;
`;

export function Menu() {
    return (
        <MenuContainer>
            <img src={WIP} style={{ height: 200, width: 200 }} alt="work in progress"></img>
            <div>
                <h3 style={{ textAlign: "center", letterSpacing: 3, color: "#f7f7fa" }}>This is a prototype. currently under development.</h3>
            </div>
        </MenuContainer>
    );
}
