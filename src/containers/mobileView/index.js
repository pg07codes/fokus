import React from "react";
import styled from "styled-components";

const MobileViewDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #fabb18;
`;
export function MobileView() {
    return (
        <MobileViewDiv>
            <h3 align="center" style={{ margin: "50px 15px" }}>
                Fokus is a web based productivity tool. Currently it is not supported for mobile browsers. Please visit the{" "}
                <i>
                    <a href="https://fokus-website.netlify.com">website</a>
                </i>{" "}
                to know more.
            </h3>

            <img
                style={{ width: "90%", margin: 40 }}
                src="https://user-images.githubusercontent.com/34238240/115880633-90edf500-a468-11eb-91bd-b8a9c52a678c.png"
                alt="fokus app"
            />
        </MobileViewDiv>
    );
}
