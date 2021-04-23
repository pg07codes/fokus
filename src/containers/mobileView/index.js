import React from "react";
import styled from "styled-components";

const MobileViewDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    background-color: #FABB18;
    width: 100%;
    height: 100%;
    color: #fff;
`;
export function MobileView() {
    return (
        <MobileViewDiv>
            <h3 align="center" style={{ margin: "50px 15px" }}>
                Currently fokus app is not supported in mobile browsers.
            </h3>

            <h2 align="center" style={{ margin: "50px 15px" }}>
                Fokus is a web based productivity tool. Visit <a href="https://fokus-website.netlify.com">website</a> to know more.
            </h2>
        </MobileViewDiv>
    );
}
