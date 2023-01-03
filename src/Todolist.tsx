import React from "react";

type Task = {
    id: number;
    title: string;
    isDone: boolean;
};

type Props = {
    title: string;
    tasks: Task[];
};

export const Todolist = ({title, tasks}: Props) => {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks.map(task => <li key={task.id}><input type="checkbox"
                                                        checked={task.isDone}/>
                <span>{task.title}</span></li>)}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}