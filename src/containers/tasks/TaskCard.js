import React from "react";
import { useDispatch } from 'react-redux'
import { create, remove, update, tick, reset, toggleIsRunning } from "./tasksSlice";
import useTimer from '../../hooks/useTimer'

export default function TaskCard({task}) {
    const delay = 1000;
    const dispatch = useDispatch();
    useTimer(
        () => {
            if (task.remainingTime > 0) {
                dispatch(tick(task.id));
            }else if (task.remainingTime === 0) {
                dispatch(toggleIsRunning(task.id))
            }
        },
        task.isRunning ? delay : null
    );

    return (
        <div key={task.id} style={{ padding: "10px", width: "200px", margin: "20px auto", border: "orange solid 1px", borderRadius: "5px" }}>
            <p>{task.content}</p>
            <p>{task.remainingTime}</p>
            <button onClick={() => dispatch(remove(task.id))}>remove</button>
            <button onClick={() => dispatch(toggleIsRunning(task.id))}>play/pause</button>
            <button onClick={() => dispatch(reset(task.id))}>reset</button>
        </div>
    );
    
}
