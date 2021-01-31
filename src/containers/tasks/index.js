import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create, updateOrder, incrementGlobalKey } from "./tasksSlice";
import TaskCard from "./TaskCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Flipper } from "react-flip-toolkit";
import styled from "styled-components";

const TaskInputContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px auto;
    width: 600px;
    background-color: #f8f8ff;
    border-radius: 15px;
    height: 75px;
`;

const TaskInputField = styled.input`
    height: 50px;
    width: 90%;
    font-size: 0.9rem;
    border: 0;
    outline: none;
    border-radius: 15px;
    background-color: #f8f8ff;
`;

export function Task() {
    const tasks = useSelector((state) => state.tasks.taskArray);
    const meta = useSelector((state) => state.tasks.meta);
    const dispatch = useDispatch();

    const [task, setTask] = useState("");

    function submitTask(e) {
        if (e.key === "Enter" && task.trim().length > 2) {
            let temp = task.trim().split(" ");
            let time = 0;
            if (!isNaN(parseInt(temp[temp.length - 1]))) {
                time = parseInt(temp.pop());
            } else {
                time = 20;
            }
            temp = temp.join(" ");

            let newTask = {
                id: Math.floor(Math.random() * 10000),
                globalKey: meta.globalKey,
                content: temp,
                time: time * 60,
                remainingTime: time * 60,
                isRunning: false,
                isCompleted: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            dispatch(create(newTask));
            dispatch(incrementGlobalKey());
            setTask("");
            e.target.value = "";
            e.target.focus();
        }
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        let items = [...tasks.map((i) => ({ ...i }))];
        //let items = [...tasks]
        // let x = JSON.stringify(items);
        // items = JSON.parse(x);

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        let i = result.source.index;
        let direction = result.destination.index > result.source.index; // direction true means moving right & swapping
        while (i != result.destination.index) {
            if (direction) {
                items[i].globalKey = tasks[i].globalKey;
                i++;
            } else {
                items[i].globalKey = tasks[i].globalKey;
                i--;
            }
            if (i == result.destination.index) {
                items[i].globalKey = tasks[i].globalKey;
            }
        }

        dispatch(updateOrder(items));
    }

    function getFlipKey() {
        let flipKey = "";
        tasks.forEach((i) => {
            flipKey += `${i.globalKey}`;
        });
        return flipKey;
    }

    return (
        <div style={{ flex: "3 1 0"}}>
            <TaskInputContainer>
                <TaskInputField type="text" onChange={(e) => setTask(e.target.value)} onKeyDown={submitTask} />
            </TaskInputContainer>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="dropArea">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Flipper flipKey={getFlipKey()}>
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
        </div>
    );
}
