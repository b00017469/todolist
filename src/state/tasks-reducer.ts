import {AppActions, AppThunk} from "./store";
import {tasksAPI, TaskType} from "../api/task-api";

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

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAction => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
};
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const;
};
export const changeTaskStatus = (todolistId: string, taskId: string, status: boolean): ChangeTaskStatusAction => {
    return {type: "CHANGE-TASK-STATUS", todolistId, taskId, status}
};
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAction => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
};
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


//Thunks
export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then((response) => {
            dispatch(setTasksAC(response.data.items, todolistId))
        });
}

export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.status === 0) {
                const task = res.data
                dispatch(addTaskAC(task))
                //    dispatch(setAppStatusAC('succeeded'))
            } else {
                // if (res.data.messages.length) {
                //     dispatch(setAppErrorAC(res.data.messages[0]))
                // } else {
                //     dispatch(setAppErrorAC('Some error occurred'))
                // }
                // dispatch(setAppStatusAC('failed'))
            }

        })
    // .catch((error:AxiosError)=>{
    //     dispatch(setAppErrorAC(error.message))
    //     dispatch(setAppStatusAC('failed'))
    // })
}
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
    // dispatch(setAppStatusAC('loading'))
     tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
         //  dispatch(setAppStatusAC('succeeded'))
        })
}

export type TasksState = {
    [key: string]: TaskType[];
};

export type RemoveTaskAction = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string,
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


export type TasksActions =
    | RemoveTaskAction
    | ReturnType<typeof addTaskAC>
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction
    | ReturnType<typeof setTasksAC>;