import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export function FocusBoard() {
    const focusBoard = useSelector((state) => state.focusBoard);
    const dispatch = useDispatch();

    const [isFocusON, setIsFocusON] = useState(false);

    return (
        <div style={{ flex: "1 1 0", backgroundColor: "#fff1c1" }}>
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
