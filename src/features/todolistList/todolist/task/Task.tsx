import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {removeTaskTC, updateTaskTC} from "../../../../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../api/task-api";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";

type Props = {
    task: TaskType;
    todolistId: string;
};

export const Task = memo(({task, todolistId}: Props) => {
    const dispatch = useAppDispatch();

    const onRemoveClick = () => {
        dispatch(removeTaskTC(todolistId, task.id));
    };
    const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(
            todolistId,
            task.id,
            {status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        ))
    };
    const changeTaskTitleHandle = (newTitle: string) => {
        dispatch(updateTaskTC(todolistId, task.id, {title: newTitle}));
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
