import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeTaskStatus, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/task-api";

type Props = {
    task: TaskType;
    todolistId: string;
};

export const Task = memo(({task, todolistId}: Props) => {
    const dispatch = useDispatch();

    const onRemoveClick = () => {
        dispatch(removeTaskAC(todolistId, task.id));
    };
    const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatus(todolistId, task.id, event.currentTarget.checked))
    };
    const changeTaskTitleHandle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, newTitle));
    };

    const isChecked = task.status === TaskStatuses.Completed;

    return <div key={task.id}
                className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox checked={isChecked}
                  onChange={onChangeHandle}/>
        <EditableSpan value={task.title} onChange={changeTaskTitleHandle}/>

        <IconButton onClick={onRemoveClick}>
            <Delete/>
        </IconButton>
    </div>
});
