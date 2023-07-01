import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "./taskBoardSlice";
import TaskCard from "./../../components/TaskBoard/TaskCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Flipper } from "react-flip-toolkit";
import { focusOnTask } from "./taskBoardSlice";
import styled from "styled-components";
import TaskInput from "./../../components/TaskBoard/TaskInput";
import Divider from "./../../components/TaskBoard/Divider";
import NoTasks from "../../components/TaskBoard/NoTasks";

const TaskBoardContainer = styled.div`
    flex: 1 1 0;
    display: flex;
    min-width: 396px;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll; // to enable scrolling by default for this flex-container only
`;

const EmptySpace = styled.div`
    display: flex;
    min-width: 10px;
    min-height: 10px;
    margin: 10px;
`;

export function TaskBoard() {
    const tasks = useSelector((state) => state.tasks.taskArray);
    const meta = useSelector((state) => state.tasks.meta);
    let focussedTask = meta.focussedTaskIndex !== -1 ? tasks[meta.focussedTaskIndex] : null;
    const dispatch = useDispatch();

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        let items = [...tasks.map((i) => ({ ...i }))];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        let i = result.source.index;
        let direction = result.destination.index > result.source.index; // direction true means moving right & swapping
        // below is logic to reset globalKeys to maintain correct sort order.
        while (i !== result.destination.index) {
            if (direction) {
                items[i].globalKey = tasks[i].globalKey;
                i++;
            } else {
                items[i].globalKey = tasks[i].globalKey;
                i--;
            }
            if (i === result.destination.index) {
                items[i].globalKey = tasks[i].globalKey;
            }
        }

        if (meta.focussedTaskIndex !== -1) {
            let greaterIndex = Math.max(result.destination.index, result.source.index);
            let smallerIndex = Math.min(result.destination.index, result.source.index);

            if (result.source.index === meta.focussedTaskIndex) {
                dispatch(focusOnTask(result.destination.index));
            } else if (meta.focussedTaskIndex >= smallerIndex && meta.focussedTaskIndex <= greaterIndex) {
                if (result.destination.index > result.source.index) {
                    dispatch(focusOnTask(meta.focussedTaskIndex - 1)); // -1
                } else {
                    dispatch(focusOnTask(meta.focussedTaskIndex + 1)); // +1
                }
            }
        }

        dispatch(updateOrder(items)); // order is imp. focus then updateOrder
    }

    function getFlipKey() {
        let flipKey = "";
        tasks.forEach((i) => {
            flipKey += `${i.globalKey}`;
        });
        flipKey += `${meta.completedTaskStartIndex}`;
        return flipKey;
    }

    function isFocussed(id) {
        if (focussedTask !== null && focussedTask.id === id) return true;
        return false;
    }

    // input has both onChange and onKeyDown - can be optimised by using one and combining

    return (
        <TaskBoardContainer>
            <TaskInput focussedTaskIndex={meta.focussedTaskIndex} />
            {tasks.length === 0 ? <NoTasks /> : tasks.length === meta.completedTasksCount && <NoTasks allCompleted={true} />}
            <Flipper flipKey={getFlipKey()}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="dropArea">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map((i, index) =>
                                    !i.isCompleted ? (
                                        <Draggable isDragDisabled={i.isCompleted} key={i.id} draggableId={`${i.id}`} index={index}>
                                            {(provided2) => (
                                                <TaskCard
                                                    focussedTaskIndex={meta.focussedTaskIndex}
                                                    focussedTaskGlobalKey={meta.focussedTaskIndex !== -1 ? tasks[meta.focussedTaskIndex].globalKey : -1}
                                                    taskIndex={index}
                                                    forwardRBDProvided={provided2}
                                                    task={i}
                                                    isFocussed={isFocussed(i.id)}
                                                />
                                            )}
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

                {meta.completedTaskStartIndex !== -1 && <Divider />}

                {meta.showCompletedTasks &&
                    tasks.map((i, index) =>
                        i.isCompleted ? (
                            <TaskCard
                                focussedTaskIndex={meta.focussedTaskIndex}
                                focussedTaskGlobalKey={meta.focussedTaskIndex !== -1 ? tasks[meta.focussedTaskIndex].globalKey : -1}
                                taskIndex={index}
                                key={i.id}
                                forwardRBDProvided={{ innerRef: null }}
                                task={i}
                                isFocussed={isFocussed(i.id)}
                            />
                        ) : (
                            ""
                        )
                    )}
            </Flipper>
            <EmptySpace />
        </TaskBoardContainer>
    );
}
