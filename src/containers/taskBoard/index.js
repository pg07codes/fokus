import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create, updateOrder, incrementGlobalKey } from "./taskBoardSlice";
import TaskCard from "./TaskCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Flipper } from "react-flip-toolkit";
import styled from "styled-components";

const TaskBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 3 1 0;
`;

const TaskInputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 576px;
    background-color: #f8f8ff;
    border-radius: 5px;
    height: 75px;
`;

const TaskInputField = styled.input`
    height: 70%;
    width: 90%;
    font-size: 1em;
    font-weight: bold;
    border: 0;
    outline: none;
    background-color: #f8f8ff;
`;

const DoneTasksDivider = styled.div`
    width: 100px;
    height: 10px;
    background-color: pink;
`;

export function TaskBoard() {
    const tasks = useSelector((state) => state.tasks.taskArray);
    const meta = useSelector((state) => state.tasks.meta);
    const dispatch = useDispatch();

    const [task, setTask] = useState("");

    function submitTask(e) {
        if (e.key === "Enter" && task.trim().length >= 3) {
            let temp = task.trim().split(" ");
            let time = 0;
            if (temp.length !== 1 && !isNaN(parseInt(temp[temp.length - 1]))) {
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

    // input has both onChange and onKeyDown - can be optimised by using one and combining

    return (
        <TaskBoardContainer>
            <TaskInputContainer>
                <TaskInputField type="text" onChange={(e) => setTask(e.target.value)} onKeyDown={submitTask} />
            </TaskInputContainer>
            <Flipper flipKey={getFlipKey()}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="dropArea">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map((i, index) =>
                                    !i.isCompleted ? (
                                        <Draggable isDragDisabled={i.isCompleted} key={i.id} draggableId={`${i.id}`} index={index}>
                                            {(provided2) => <TaskCard forwardRBDProvided={provided2} task={i} />}
                                        </Draggable>
                                    ) : (
                                        ""
                                    )
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <DoneTasksDivider />

                {tasks.map((i, index) => (i.isCompleted ? <TaskCard forwardRBDProvided={{ innerRef: null }} task={i} /> : ""))}
            </Flipper>
        </TaskBoardContainer>
    );
}
