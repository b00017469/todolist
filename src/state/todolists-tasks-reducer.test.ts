import {tasksReducer, TasksState} from "./tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: TodolistDomainType[] = []

    const action = addTodolistAC({
        id: v1(),
        addedDate: '',
        order: 0,
        title: 'New Todolist Title'
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})
