import React, {useState} from 'react';
import './App.css';
import {Task, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValue = 'all' | 'active' | 'completed';

export type Todolists = {
    id: string;
    title: string;
    filter: FilterValue;
};

export type TaskState = {
    [key: string]: Task[];
}


export const App = () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Todolists[]>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    );

    const [tasks, setTasks] = useState<TaskState>(
        {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false}
            ],
        }
    );

    const removeTask = (todolistId: string, id: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== id)
        });
    };

    const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id ?
                {...task, isDone}
                : task)
        })
    };

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    };

    const changeFilter = (todolistId: string, value: FilterValue) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId
            ? {...todolist, filter: value}
            : todolist));
    };

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
    }

    return (
        <div className="App">
            {todolists.map(todolist => {
                let tasksForTodolist = tasks[todolist.id];
                if (todolist.filter === 'active') tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone);
                if (todolist.filter === 'completed') tasksForTodolist = tasks[todolist.id].filter(task => task.isDone);

                return <Todolist key={todolist.id}
                                 id={todolist.id}
                                 title={todolist.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 setFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 filter={todolist.filter}
                                 removeTodolist={removeTodolist}/>
            })}
        </div>
    );
}

