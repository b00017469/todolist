import {FilterValue} from "../App";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {AppActions, AppThunk} from "./store";
import {RequestStatusType, setStatus} from "./app-reducer";
import {AxiosError} from "axios";

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: AppActions): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map((todo) => ({
                ...todo, filter: 'all', entityStatus: "idle"
            }));
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, title: action.title}
                : todolist);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, filter: action.filter}
                : todolist);
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map((tl) => tl.id === action.id ?
                {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state;
    }
};

export const setTodolists = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
};
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
};
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title} as const
};
export const changeTodolistFilter = (todolistId: string, filter: FilterValue) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter} as const
};
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus
} as const)


// thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolists(res.data))
            dispatch(setStatus('succeeded'))
        })
};

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                // dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    // dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    // dispatch(setAppErrorAC('Some error occurred'))
                }
            }
        })
        .catch((error: AxiosError) => {
            // handleServerNetworkError(error, dispatch)
             dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'))
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                // if (res.data.messages.length) {
                //     dispatch(setAppErrorAC(res.data.messages[0]))
                // } else {
                //     dispatch(setAppErrorAC('Some error occurred'))
                // }
            }
        })
        .catch((error: AxiosError) => {
            //     dispatch(setAppErrorAC(error.message))
            // })
            // .finally(() => {
            //     dispatch(setAppStatusAC('idle'))
        })
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
            // dispatch(setAppStatusAC('succeeded'))
        })
}


export type TodolistsActions =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTodolistEntityStatusAC>;

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}