import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        taskArray: [],
        labels: {},
        meta: {
            globalKey: 0,
            completedTaskStartIndex: -1,
            focussedTaskIndex: -1,
            showCompletedTasks: true,
            completedTasksCount: 0,
        },
    },
    reducers: {
        create: (tasks, { payload }) => {
            tasks.taskArray.unshift(payload);
            if (tasks.meta.completedTaskStartIndex != -1) ++tasks.meta.completedTaskStartIndex;
        },
        remove: (tasks, { payload }) => {
            tasks.taskArray = tasks.taskArray.filter((i) => {
                if (i.id !== payload) return true;
                else {
                    if (!i.isCompleted) {
                        if (tasks.meta.completedTaskStartIndex != -1) --tasks.meta.completedTaskStartIndex;
                    } else {
                        tasks.meta.completedTasksCount--;
                        if (tasks.meta.completedTaskStartIndex == tasks.taskArray.length - 1) {
                            tasks.meta.completedTaskStartIndex = -1;
                        }
                    }
                    return false;
                }
            });
        },
        addLabel: (tasks, { payload }) => {
            if (tasks.labels[payload]!==undefined) {
                tasks.labels[payload] = tasks.labels[payload] + 1;
            } else {
                tasks.labels[payload] = 1;
            }
        },
        updateTask: (tasks, { payload }) => {
            tasks.taskArray = tasks.taskArray.map((i) => (i.id === payload.id ? payload : i));
        },
        updateTaskContent: ({ taskArray }, { payload }) => {
            taskArray.forEach((i) => {
                if (i.id === payload.id) {
                    i.content = payload.updatedTaskContent;
                }
            });
        },
        updateTaskTime: ({ taskArray }, { payload }) => {
            taskArray.forEach((i) => {
                if (i.id === payload.id) {
                    i.remainingTime = payload.updatedTime * 60;
                    i.time = payload.updatedTime * 60;
                }
            });
        },
        updateTaskTimeByVal: (tasks, { payload }) => {
            tasks.taskArray[payload.focussedTaskIndex].remainingTime += payload.val * 60;
            tasks.taskArray[payload.focussedTaskIndex].time += payload.val * 60;
            if (tasks.taskArray[payload.focussedTaskIndex].remainingTime < 0) {
                tasks.taskArray[payload.focussedTaskIndex].remainingTime = 0;
            }
            if (tasks.taskArray[payload.focussedTaskIndex].time < 0) {
                tasks.taskArray[payload.focussedTaskIndex].time = 0;
            }
        },
        updateOrder: (tasks, { payload }) => {
            tasks.taskArray = payload;
        },

        focusOnTask: (tasks, { payload }) => {
            tasks.meta.focussedTaskIndex = payload;
        },
        resetFocussedTask: (tasks) => {
            tasks.meta.focussedTaskIndex = -1;
        },
        tick: (tasks, { payload }) => {
            --tasks.taskArray[payload].remainingTime;
        },
        resetTaskTimer: (tasks, { payload }) => {
            tasks.taskArray[payload].isRunning = false;
            tasks.taskArray[payload].remainingTime = tasks.taskArray[payload].time;
        },
        toggleIsRunning: (tasks, { payload }) => {
            if (payload.val !== undefined) tasks.taskArray[payload.idx].isRunning = payload.val;
            else tasks.taskArray[payload.idx].isRunning = !tasks.taskArray[payload.idx].isRunning;
        },
        toggleShowCompletedTasks: (tasks) => {
            tasks.meta.showCompletedTasks = !tasks.meta.showCompletedTasks;
        },
        toggleIsCompleted: (tasks, { payload }) => {
            tasks.taskArray.forEach((i) => {
                if (i.id === payload) {
                    i.isCompleted ? --tasks.meta.completedTasksCount : ++tasks.meta.completedTasksCount;
                    i.isCompleted = !i.isCompleted;
                }
            });
        },
        clearCompletedTasks: (tasks) => {
            if (tasks.meta.completedTaskStartIndex !== -1) {
                tasks.taskArray.length = tasks.meta.completedTaskStartIndex;
                tasks.meta.completedTaskStartIndex = -1;
                tasks.meta.completedTasksCount = 0;
            }
        },
        incrementGlobalKey: ({ meta }) => {
            ++meta.globalKey;
        },
        rearrange: (tasks, { payload }) => {
            let id = payload.id;

            if (payload.markedAsComplete) {
                if (tasks.meta.completedTaskStartIndex === -1) {
                    tasks.meta.completedTaskStartIndex = tasks.taskArray.length - 1;
                    let found = false;
                    for (let i = 0; i < tasks.taskArray.length - 1; i++) {
                        if (found) {
                            let temp = tasks.taskArray[i];
                            tasks.taskArray[i] = tasks.taskArray[i + 1];
                            tasks.taskArray[i + 1] = temp;
                        } else if (tasks.taskArray[i].id === id) {
                            found = true;
                            let temp = tasks.taskArray[i];
                            tasks.taskArray[i] = tasks.taskArray[i + 1];
                            tasks.taskArray[i + 1] = temp;
                        }
                    }
                    tasks.meta.completedTaskStartIndex = tasks.taskArray.length - 1;
                } else {
                    let task, idx;
                    for (let i = 0; i < tasks.taskArray.length; i++) {
                        if (tasks.taskArray[i].id === id) {
                            task = tasks.taskArray[i];
                            idx = i;
                            break;
                        }
                    }
                    let pos = -1;
                    for (let i = tasks.meta.completedTaskStartIndex; i < tasks.taskArray.length; i++) {
                        if (tasks.taskArray[i].globalKey > task.globalKey) continue;
                        else {
                            pos = i;
                            break;
                        }
                    }

                    if (pos === -1) {
                        tasks.taskArray.push(task);
                    } else {
                        tasks.taskArray.splice(pos, 0, task);
                    }
                    tasks.taskArray.splice(idx, 1);
                    tasks.meta.completedTaskStartIndex -= 1;
                }
            } else {
                if (tasks.meta.completedTaskStartIndex == 0) {
                    let task, idx;
                    for (let i = tasks.meta.completedTaskStartIndex; i < tasks.taskArray.length; i++) {
                        if (tasks.taskArray[i].id === id) {
                            task = tasks.taskArray[i];
                            idx = i;
                            break;
                        }
                    }

                    tasks.taskArray.splice(idx, 1);
                    tasks.taskArray.unshift(task);
                    tasks.meta.completedTaskStartIndex = 1;
                } else {
                    let task, idx;
                    for (let i = tasks.meta.completedTaskStartIndex; i < tasks.taskArray.length; i++) {
                        if (tasks.taskArray[i].id === id) {
                            task = tasks.taskArray[i];
                            idx = i;
                            break;
                        }
                    }

                    let start = tasks.meta.completedTaskStartIndex - 1;
                    let pos = -1;
                    for (let i = start; i >= 0; i--) {
                        if (tasks.taskArray[i].globalKey < task.globalKey) continue;
                        else {
                            pos = i;
                            break;
                        }
                    }

                    tasks.taskArray.splice(idx, 1);
                    if (pos === -1) {
                        tasks.taskArray.unshift(task);
                    } else {
                        pos++;
                        tasks.taskArray.splice(pos, 0, task);
                    }
                    tasks.meta.completedTaskStartIndex += 1;
                }

                if (tasks.meta.completedTaskStartIndex == tasks.taskArray.length) {
                    tasks.meta.completedTaskStartIndex = -1;
                }
            }
        },
    },
});

export const {
    create,
    remove,
    addLabel,
    updateTask,
    updateTaskContent,
    updateTaskTime,
    updateTaskTimeByVal,
    focusOnTask,
    resetFocussedTask,
    tick,
    resetTaskTimer,
    toggleIsRunning,
    toggleShowCompletedTasks,
    toggleIsCompleted,
    clearCompletedTasks,
    updateOrder,
    incrementGlobalKey,
    rearrange,
} = tasksSlice.actions;

export default tasksSlice.reducer;
