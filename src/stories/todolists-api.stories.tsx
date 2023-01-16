import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolistsAPI";
import {tasksAPI} from "../api/task-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((response)=>setState(response.data));
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('dosododo')
            .then((response)=>setState(response.data));
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'b599d0f3-3d71-495e-a414-d1a6c8ed1f6c';
    useEffect(() => {
       todolistsAPI.deleteTodolist(todolistId)
            .then((response)=>setState(response.data));
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a7c998b9-b141-4efc-ac74-2503dbf7924e';
    useEffect(() => {
       todolistsAPI.updateTodolist(todolistId, 'new title is updated')
            .then((response)=>setState(response.data));
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a592a29c-49a6-43a7-9dee-1e9f5a11739e'
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a592a29c-49a6-43a7-9dee-1e9f5a11739e';
        const taskId = '0ce722d8-da79-416d-8a9e-99832dc03a5e';
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a592a29c-49a6-43a7-9dee-1e9f5a11739e'
        tasksAPI.createTask(todolistId, 'HTML')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a592a29c-49a6-43a7-9dee-1e9f5a11739e'
        const taskId = '7d982fe5-0cf3-4ed0-a6bb-60f34dc42634'
        const task = {
            title: 'new task title',
            description: '',
            completed: true,
            status: 1,
            priority: 10,
            startDate: '',
            deadline: ''
        }
        tasksAPI.updateTask(todolistId, taskId, task)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}