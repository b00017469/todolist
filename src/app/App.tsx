import React from 'react';
import './App.css';
import Container from "@mui/material/Container";
import {Header} from "../Header";
import {TodolistList} from "../features/todolistList/TodolistList";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar";


export const App = () => {

    return (
        <div className="App">
            <ErrorSnackbar/>

            <Header/>

            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    );
}

