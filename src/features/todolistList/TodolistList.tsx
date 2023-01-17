import React, {useCallback, useEffect} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {
    addTodolistTC,
    changeTodolistFilter,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValues,
    removeTodolistTC
} from "../../state/todolists-reducer";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../common/components/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";

export const TodolistList = () => {

    const todolists = useAppSelector(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, []);

    const changeFilter = useCallback((todolistId: string, value: FilterValues) => {
        dispatch(changeTodolistFilter(todolistId, value));
    }, []);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, []);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, []);

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title));
    }, []);

    return (
        <>
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
                                changeTodolistTitle={changeTodolistTitle}
                            entityStatus={todolist.entityStatus}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    );
};