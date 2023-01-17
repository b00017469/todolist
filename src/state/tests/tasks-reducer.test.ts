import {
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksState,
    updateTaskAC
} from '../tasks-reducer';
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/task-api";

let startState: TasksState;

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            }
        ]
    }
});

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            }
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        description: '',
        title: 'juice',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        id: '2',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('todolistId2', '2', {status: TaskStatuses.New})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC('todolistId2', '3', {title: 'salt'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][2].title).toBe('salt')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: 'todolistId2',
        title: 'new todo',
        order: 1,
        addedDate: ''
    })

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})


