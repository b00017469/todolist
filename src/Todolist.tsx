import React, {ChangeEvent} from "react";
import {FilterValue} from "./App";
import {AddItemForm} from "./common/components/AddItemForm";
import {EditableSpan} from "./common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

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

        <IconButton onClick={onRemoveTodolistClick}>
            <Delete/>
        </IconButton>

        <AddItemForm addItem={addTaskHandle}/>

        <div>
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
                return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <Checkbox checked={task.isDone}
                              onChange={onChangeHandle}/>
                    <EditableSpan value={task.title} onChange={changeTaskTitleHandle}/>

                    <IconButton onClick={onRemoveClick}>
                        <Delete/>
                    </IconButton>
                </div>
            })}
        </div>

        <div>
            <Button onClick={onAllClickHandle}
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color='inherit'>All
            </Button>

            <Button onClick={onActiveClickHandle}
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color='primary'>Active
            </Button>

            <Button onClick={onCompletedClickHandle}
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color='secondary'>Completed
            </Button>
        </div>
    </div>
}