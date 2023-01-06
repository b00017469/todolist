import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValue} from "./App";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
};

type Props = {
    id: string;
    title: string;
    tasks: Task[];
    filter: FilterValue;
    removeTask: (todolistId: string, id: string) => void;
    setFilter: (todolistId: string, value: FilterValue) => void;
    addTask: (todolistId: string, title: string) => void;
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void;
    removeTodolist: (todolistId: string) => void;
};

export const Todolist = ({
                             title,
                             id,
                             tasks,
                             removeTask,
                             setFilter,
                             addTask,
                             changeStatus,
                             filter,
                             removeTodolist
                         }: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
        setErrorMessage(null);
    };

    const addTaskHandle = () => {
        if (taskTitle.trim() !== '') {
            addTask(id, taskTitle.trim());
            setTaskTitle('');
        } else {
            setErrorMessage('Title is required');
        }
    };

    const onKeyPressHandle = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandle();
    };

    const onAllClickHandle = () => {
        setFilter(id, 'all');
    };

    const onActiveClickHandle = () => {
        setFilter(id, 'active');
    };

    const onCompletedClickHandle = () => {
        setFilter(id, 'completed');
    };

    const onRemoveTodolistClick = () => {
        removeTodolist(id);
    };

    return <div>
        <h3>{title}</h3>
        <button onClick={onRemoveTodolistClick}>✖</button>
        <div>
            <input value={taskTitle} onChange={changeTitle}
                   onKeyPress={onKeyPressHandle}
                   className={errorMessage ? 'error' : ''}/>
            <button onClick={addTaskHandle}>+</button>
            {errorMessage && <div className={'error-message'}>{errorMessage}</div>}
        </div>
        <ul>
            {tasks.map(task => {
                const onRemoveClick = () => {
                    removeTask(id, task.id)
                }
                const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(id, task.id, event.currentTarget.checked)
                }
                return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={task.isDone}
                           onChange={onChangeHandle}/>
                    <span>{task.title}</span>
                    <button onClick={onRemoveClick}>✖</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={onAllClickHandle}
                    className={filter === 'all' ? 'active-filter' : ''}>All
            </button>
            <button onClick={onActiveClickHandle}
                    className={filter === 'active' ? 'active-filter' : ''}>Active
            </button>
            <button onClick={onCompletedClickHandle}
                    className={filter === 'completed' ? 'active-filter' : ''}>Completed
            </button>
        </div>
    </div>
}