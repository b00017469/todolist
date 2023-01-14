import {tasksReducer, TasksState} from "./tasks-reducer";
import {addTodolist, todolistsReducer, TodolistState} from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: Array<TodolistState> = []

    const action = addTodolist('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
