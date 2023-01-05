import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValue = 'all' | 'active' | 'completed';


export const App = () => {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValue>('all');

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    };

    const changeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === id ?
            {...task, isDone}
            : task)
        );
    };

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([newTask, ...tasks]);
    };

    let tasksForTodolist = tasks;
    if (filter === 'active') tasksForTodolist = tasks.filter(task => !task.isDone);
    if (filter === 'completed') tasksForTodolist = tasks.filter(task => task.isDone);

    const changeFilter = (value: FilterValue) => {
        setFilter(value);
    };

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodolist}
                      removeTask={removeTask}
                      setFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}/>
        </div>
    );
}

