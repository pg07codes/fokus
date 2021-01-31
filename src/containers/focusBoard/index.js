import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export function FocusBoard() {
    const focusBoard = useSelector((state) => state.focusBoard);
    const dispatch = useDispatch();

    const [isFocusON, setIsFocusON] = useState(false);

    return (
        <div style={{ flex: "2 1 0"  , boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)" , backgroundColor:"#f8f8ff"}}>
            {focusBoard.focussedTask != null && (
                <div>
                    <h1>{focusBoard.focussedTask.content}</h1>
                    <br />
                    <h1>{focusBoard.focussedTask.remainingTime}</h1>
                    <br />
                    <h1>{focusBoard.focussedTask.globalKey}</h1>
                </div>
            )}
        </div>
    );
}
