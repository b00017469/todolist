import {instance} from "./config";

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post<TodolistResponseType<{item: TodolistType}>>(`todo-lists`,{title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<TodolistResponseType>(`todo-lists/${todolistId}`,{title});
    },
};

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
};

type TodolistResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

