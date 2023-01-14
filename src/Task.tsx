import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatus, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

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

    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox checked={task.isDone}
                  onChange={onChangeHandle}/>
        <EditableSpan value={task.title} onChange={changeTaskTitleHandle}/>

        <IconButton onClick={onRemoveClick}>
            <Delete/>
        </IconButton>
    </div>
});
