import React from "react";
import styled from "styled-components";
import WIP from "./../../images/WIP.svg";

const MenuContainer = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(158, 226, 255);
    background: linear-gradient(90deg, rgba(158, 226, 255, 1) 0%, rgba(40, 142, 253, 1) 50%, rgba(0, 0, 205, 1) 100%);
    -webkit-box-shadow: 5px 0 10px rgba(0, 0, 205, 0.5);
    box-shadow: 5px 0 10px rgba(0, 0, 205, 0.5);
`;

export function Menu() {
    return (
        <MenuContainer>
            <img src={WIP} style={{ height: 200, width: 200 }} alt="work in progress"></img>
            <div>
                <h1 style={{ textAlign:"center", letterSpacing: 3, color: "#f7f7fa" }}>It is a prototype, currently under heavy development.</h1>
            </div>
        </MenuContainer>
    );
}
