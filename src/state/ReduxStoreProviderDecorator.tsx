import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {AppRootStateType} from "./store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    app: {status: 'succeeded', error: null},
    todolists: [
        {
            id: 'todolistId1',
            title: 'What to learn',
            filter: 'all',
            entityStatus: "idle",
            order: 1,
            addedDate: ''
        },
        {
            id: 'todolistId2',
            title: 'What to buy',
            filter: 'all',
            entityStatus: "idle",
            order: 1,
            addedDate: ''
        }
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: 2,
                todoListId: 'todolistId1',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: v1(),
                title: 'HTML&CSS',
                status: 0,
                todoListId: 'todolistId1',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: 0,
                todoListId: 'todolistId2',
                deadline: '',
                addedDate: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0
            },
            {
                id: v1(), title: 'React Book', status: 2,
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
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
