import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValue = 'all' | 'active' | 'completed';


export const App = () => {
    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValue>('all');

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    let tasksForTodolist = tasks;
    if (filter === 'active') tasksForTodolist = tasks.filter(task => !task.isDone)
    if (filter === 'completed') tasksForTodolist = tasks.filter(task => task.isDone)

    const changeFilter = (value: FilterValue) => {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodolist}
                      removeTask={removeTask}
                      setFilter={changeFilter}/>
        </div>
    );
}

