import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValue} from "./App";

type Task = {
    id: string;
    title: string;
    isDone: boolean;
};

type Props = {
    title: string;
    tasks: Task[];
    filter: FilterValue;
    removeTask: (id: string) => void;
    setFilter: (value: FilterValue) => void;
    addTask: (title: string) => void;
    changeStatus: (id: string, isDone: boolean) => void;
};

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             setFilter,
                             addTask,
                             changeStatus,
                             filter
                         }: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
        setErrorMessage(null);
    };

    const addTaskHandle = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim());
            setTaskTitle('');
        } else {
            setErrorMessage('Title is required');
        }
    };

    const onKeyPressHandle = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandle();
    };

    const onAllClickHandle = () => {
        setFilter('all');
    };

    const onActiveClickHandle = () => {
        setFilter('active');
    };

    const onCompletedClickHandle = () => {
        setFilter('completed');
    };

    return <div>
        <h3>{title}</h3>
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
                    removeTask(task.id)
                }
                const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(task.id, event.currentTarget.checked)
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