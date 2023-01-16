import {
    addTodolistAC, changeTodolistFilter, changeTodolistTitleAC,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer,
} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValue} from "../App";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[];

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
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
    ];
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, addTodolistAC({
        id: '1',
        addedDate: '',
        order: 0,
        title: newTodolistTitle
    }));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValue = 'completed';

    const endState = todolistsReducer(startState, changeTodolistFilter(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
