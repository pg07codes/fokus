import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { create} from "./tasksSlice";
import TaskCard from './TaskCard'

export function Task() {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    
    const [task,setTask] = useState("");
    const [time,setTime] = useState("");


    function submitTask() {
        let newTask = {
            id: Math.floor(Math.random() * 10000),
            content: task,
            time: time*60,
            remainingTime: time*60,
            isRunning: false,
            isCompleted:false,
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString()
        };
        dispatch(create(newTask));
    }

    return (
        <div>
            <input type="text" onChange={(e) => setTask(e.target.value)}/>
            <input type="number" onChange={(e) => setTime(e.target.value)}/>
            <input type="button" value="submit task" onClick={submitTask} />
            {tasks.map((i) => <TaskCard key={i.id} task={i}/>)}
        </div>
    );
}
