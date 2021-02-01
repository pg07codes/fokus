import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const FocusBoardContainer = styled.div`
    flex: 2 1 0;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    background-color: #f8f8ff;
`;

export function FocusBoard() {
    const focusBoard = useSelector((state) => state.focusBoard);
    const dispatch = useDispatch();

    const [isFocusON, setIsFocusON] = useState(false);

    return (
        <FocusBoardContainer>
            {focusBoard.focussedTask != null && (
                <div>
                    <h1>{focusBoard.focussedTask.content}</h1>
                    <br />
                    <h1>{focusBoard.focussedTask.remainingTime}</h1>
                    <br />
                    <h1>{focusBoard.focussedTask.globalKey}</h1>
                    <br />
                    <input type="button" value="PP"/>
                    <br />
                </div>
            )}
        </FocusBoardContainer>
    );
}
