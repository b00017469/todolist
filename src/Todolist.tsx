import React, {memo, useCallback} from "react";
import {FilterValue} from "./App";
import {AddItemForm} from "./common/components/AddItemForm";
import {EditableSpan} from "./common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {Task} from "./Task";
import {ButtonMemo} from "./common/components/ButtonMemo";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type Props = {
    id: string;
    title: string;
    tasks: TaskType[];
    filter: FilterValue;
    setFilter: (todolistId: string, value: FilterValue) => void;
    addTask: (todolistId: string, title: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void;
    changeTodolistTitle: (todolistId: string, newTitle: string) => void;
};

export const Todolist = memo(({
                                  title,
                                  id,
                                  tasks,
                                  setFilter,
                                  addTask,
                                  filter,
                                  removeTodolist,
                                  changeTaskTitle,
                                  changeTodolistTitle
                              }: Props) => {
    const onAllClickHandle = useCallback(() => {
        setFilter(id, 'all');
    }, [id]);

    const onActiveClickHandle = useCallback(() => {
        setFilter(id, 'active');
    }, [id]);

    const onCompletedClickHandle = useCallback(() => {
        setFilter(id, 'completed');
    }, [id]);

    const onRemoveTodolistClick = () => {
        removeTodolist(id);
    };

    const addTaskHandle = useCallback((title: string) => {
        addTask(id, title);
    }, [addTask, id]);

    const changeTodolistTitleHandle = useCallback((newTitle: string) => {
        changeTodolistTitle(id, newTitle);
    }, [id, changeTodolistTitle]);

    if (filter === 'active')
        tasks = tasks.filter(task => !task.isDone);
    if (filter === 'completed')
        tasks = tasks.filter(task => task.isDone);
    useCallback((taskId: string, newTitle: string) => {
        changeTaskTitle(id, taskId, newTitle);
    }, [id, changeTaskTitle]);

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
                return <Task task={task} key={task.id} todolistId={id}/>
            })}
        </div>

        <div>
            <ButtonMemo onClick={onAllClickHandle}
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        color='inherit' title={'All'}/>

            <ButtonMemo onClick={onActiveClickHandle}
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color='primary' title={'Active'}/>

            <ButtonMemo onClick={onCompletedClickHandle}
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color='secondary' title={'Completed'}/>
        </div>
    </div>
});