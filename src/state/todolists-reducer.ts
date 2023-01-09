import {FilterValue} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: Actions) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "all"}];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, title: action.title}
                : todolist);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, filter: action.filter}
                : todolist);
        default:
            throw new Error('I don\'t understand this type')
    }
};

export const RemoveTodolist = (todolistId: string): RemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
};
export const AddTodolist = (title: string): AddTodolistAction => {
    return {type: 'ADD-TODOLIST', title}
};
export const ChangeTodolistTitle = (todolistId: string, title: string): ChangeTodolistTitleAction => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title}
};
export const ChangeTodolistFilter = (todolistId: string, filter: FilterValue): ChangeTodolistFilterAction => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter}
};


export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValue;
};

export type RemoveTodolistAction = {
    type: 'REMOVE-TODOLIST',
    id: string
};
export type AddTodolistAction = {
    type: 'ADD-TODOLIST',
    title: string
};
export type ChangeTodolistTitleAction = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
};
export type ChangeTodolistFilterAction = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValue
};


type Actions =
    RemoveTodolistAction
    | AddTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction;