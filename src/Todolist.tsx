import React from "react";
import {FilterValue} from "./App";

type Task = {
    id: number;
    title: string;
    isDone: boolean;
};

type Props = {
    title: string;
    tasks: Task[];
    removeTask: (id: number) => void;
    setFilter: (value: FilterValue) => void;
};

export const Todolist = ({title, tasks, removeTask, setFilter}: Props) => {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks.map(task => <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>removeTask(task.id)}>✖</button>
            </li>)}
        </ul>
        <div>
            <button onClick={()=>setFilter('all')}>All</button>
            <button onClick={()=>setFilter('active')}>Active</button>
            <button onClick={()=>setFilter('completed')}>Completed</button>
        </div>
    </div>
}