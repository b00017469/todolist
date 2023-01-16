import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./common/components/AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Header} from "./Header";
import {
    changeTodolistFilter,
    changeTodolistTitleAC,
    removeTodolistTC,
    setTodolists
} from "./state/todolists-reducer";
import {changeTaskTitleAC} from "./state/tasks-reducer";
import {useAppSelector} from "./common/hooks/useAppSelector";
import {todolistsAPI} from "./api/todolistsAPI";
import {useAppDispatch} from "./common/hooks/useAppDispatch";

export type FilterValue = 'all' | 'active' | 'completed';

export const App = () => {

    const todolists = useAppSelector(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        todolistsAPI.getTodolists().then((response) => {
            dispatch(setTodolists(response.data))
        })
    }, []);

    const changeFilter = useCallback((todolistId: string, value: FilterValue) => {
        dispatch(changeTodolistFilter(todolistId, value));
    }, []);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, []);
    const addTodolist = useCallback((title: string) => {
       // dispatch(addTodolistAC(title));
    }, []);

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, []);

    const changeTaskTitle = useCallback((todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, title));
    }, []);

    return (
        <div className="App">
            <Header/>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        return <Grid item key={todolist.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={tasks[todolist.id]}
                                    setFilter={changeFilter}
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

