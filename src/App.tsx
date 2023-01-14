import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./common/components/AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Header} from "./Header";
import {
    addTodolistAC,
    changeTodolistFilter,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistState
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatus,
    changeTaskTitleAC,
    removeTaskAC,
    TasksState
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "./state/store";

export type FilterValue = 'all' | 'active' | 'completed';

export const App = () => {

    const todolists = useSelector<AppRootStateType, TodolistState[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksState>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id));
    };

    const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatus(todolistId, id, isDone));
    };

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title));
    };

    const changeFilter = (todolistId: string, value: FilterValue) => {
        dispatch(changeTodolistFilter(todolistId, value));
    };

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    };

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    };

    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, title));
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

