import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "./taskBoardSlice";
import TaskCard from "./TaskCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Flipper } from "react-flip-toolkit";
import styled from "styled-components";
import TaskInput from "./../../components/TaskBoard/TaskInput";

const TaskBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 3 1 0;
`;

const DoneTasksDivider = styled.div`
    width: 100%;
    height: 10px;
    background-color: black;
`;

export function TaskBoard() {
    const tasks = useSelector((state) => state.tasks.taskArray);
    const meta = useSelector((state) => state.tasks.meta);
    const dispatch = useDispatch();

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
            <TaskInput/>
            
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

                {meta.completedTaskStartIndex!==-1 && <DoneTasksDivider />}

                {tasks.map((i, index) => (i.isCompleted ? <TaskCard forwardRBDProvided={{ innerRef: null }} task={i} /> : ""))}
            </Flipper>
        </TaskBoardContainer>
    );
}
