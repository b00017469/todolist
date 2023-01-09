import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./common/components/AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Header} from "./Header";
import {TodolistState} from "./state/todolists-reducer";
import {TasksState} from "./state/tasks-reducer";

export type FilterValue = 'all' | 'active' | 'completed';

export const App = () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistState[]>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    );

    const [tasks, setTasks] = useState<TasksState>(
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
        });
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
    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistState = {id: newTodolistId, title, filter: "all"};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []})
    };

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId
            ? {...todolist, title}
            : todolist));
    };

    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id ?
                {...task, title}
                : task)
        });
    };

    return (
        <div className="App">
            <Header/>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        let tasksForTodolist = tasks[todolist.id];
                        if (todolist.filter === 'active')
                            tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone);
                        if (todolist.filter === 'completed')
                            tasksForTodolist = tasks[todolist.id].filter(task => task.isDone);

                        return <Grid item key={todolist.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    setFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={todolist.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

