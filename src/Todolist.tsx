import React, {ChangeEvent} from "react";
import {FilterValue} from "./App";
import {AddItemForm} from "./common/components/AddItemForm";
import {EditableSpan} from "./common/components/EditableSpan";

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
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void;
    changeTodolistTitle: (todolistId: string, newTitle: string) => void;
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
                             removeTodolist,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: Props) => {


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

    const addTaskHandle = (title: string) => {
        addTask(id, title);
    };

    const changeTodolistTitleHandle = (newTitle: string) => {
        changeTodolistTitle(id, newTitle);
    }

    return <div>
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandle}/>
        </h3>
        <button onClick={onRemoveTodolistClick}>✖</button>
        <AddItemForm addItem={addTaskHandle}/>
        <ul>
            {tasks.map(task => {
                const onRemoveClick = () => {
                    removeTask(id, task.id)
                }
                const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(id, task.id, event.currentTarget.checked)
                }
                const changeTaskTitleHandle = (newTitle: string) => {
                    changeTaskTitle(id, task.id, newTitle);
                }
                return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={task.isDone}
                           onChange={onChangeHandle}/>
                    <EditableSpan value={task.title} onChange={changeTaskTitleHandle}/>
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