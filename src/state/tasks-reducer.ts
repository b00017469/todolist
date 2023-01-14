import {Task} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistAction, RemoveTodolistAction} from "./todolists-reducer";

const initialState: TasksState = {};

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            };
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {
                ...state, [action.todolistId]:
                    [newTask, ...state[action.todolistId]]
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId
                        ? {...task, isDone: action.status}
                        : task)
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId
                        ? {...task, title: action.title}
                        : task)
            };
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []};
        case "REMOVE-TODOLIST":
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            return state;
    }
};

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAction => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
};
export const addTaskAC = (todolistId: string, title: string): AddTaskAction => {
    return {type: 'ADD-TASK', todolistId, title}
};
export const changeTaskStatus = (todolistId: string, taskId: string, status: boolean): ChangeTaskStatusAction => {
    return {type: "CHANGE-TASK-STATUS", todolistId, taskId, status}
};
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAction => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
};

export type TasksState = {
    [key: string]: Task[];
};

export type RemoveTaskAction = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string,
};
export type AddTaskAction = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string,
};
export type ChangeTaskStatusAction = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    taskId: string,
    status: boolean,
};
export type ChangeTaskTitleAction = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    taskId: string,
    title: string,
};


type Actions =
    RemoveTaskAction
    | AddTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction
    | AddTodolistAction
    | RemoveTodolistAction;