import {AppActions, AppRootStateType, AppThunk} from "./store";
import {
    TaskPriorities,
    tasksAPI,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from "../api/task-api";
import {setError, setStatus} from "./app-reducer";
import {AxiosError} from "axios";

const initialState: TasksState = {};

export const tasksReducer = (state: TasksState = initialState, action: AppActions): TasksState => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            };
        case 'ADD-TASK':
            return {
                ...state, [action.task.todoListId]:
                    [action.task, ...state[action.task.todoListId]]
            };
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []};
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
};

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const;
};
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const;
};
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const);
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


//Thunks
export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    tasksAPI.getTasks(todolistId)
        .then((response) => {
            dispatch(setTasksAC(response.data.items, todolistId))
            dispatch(setStatus('succeeded'))
        });
}

export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item;
                dispatch(addTaskAC(task))
                dispatch(setStatus('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setError(res.data.messages[0]))
                } else {
                    dispatch(setError('Some error occurred'))
                }
                dispatch(setStatus('failed'))
            }

        })
        .catch((error: AxiosError) => {
            dispatch(setError(error.message))
            dispatch(setStatus('failed'))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(() => {
            const action = removeTaskAC(todolistId, taskId)
            dispatch(action)
            dispatch(setStatus('succeeded'))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const {tasks} = getState()
        const task = tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setStatus('loading'))
        tasksAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(todolistId, taskId, domainModel)
                    dispatch(action)
                    dispatch(setStatus('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setError(res.data.messages[0]))
                    } else {
                        dispatch(setError('Some error occurred'))
                    }
                    dispatch(setStatus('failed'))
                }
            })
    }


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksState = {
    [key: string]: TaskType[];
};

export type TasksActions =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>;