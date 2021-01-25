import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create, updateOrder } from "./tasksSlice";
import TaskCard from "./TaskCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Flipper, Flipped } from "react-flip-toolkit";

export function Task() {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const [task, setTask] = useState("");
    const [time, setTime] = useState("");

    function submitTask() {
        let newTask = {
            id: Math.floor(Math.random() * 10000),
            listIndex: tasks.length + 1,
            content: task,
            time: time * 60,
            remainingTime: time * 60,
            isRunning: false,
            isCompleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        dispatch(create(newTask));
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(updateOrder(items));
    }

    return (
        <>
            <input type="text" onChange={(e) => setTask(e.target.value)} />
            <input type="number" onChange={(e) => setTime(e.target.value)} />
            <input type="button" value="submit task" onClick={submitTask} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="dropArea">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Flipper flipKey={tasks.length}>
                                {tasks.map((i, index) => (
                                    
                                        <Draggable key={i.id} draggableId={`${i.id}`} index={index}>
                                            {(provided2) => <TaskCard forwardRBDProvided={provided2} task={i} />}
                                        </Draggable>
                                    
                                ))}
                                {provided.placeholder}
                            </Flipper>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}
