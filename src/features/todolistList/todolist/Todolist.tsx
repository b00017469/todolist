import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../common/components/AddItemForm";
import {EditableSpan} from "../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {ButtonMemo} from "../../../common/components/ButtonMemo";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {addTaskTC, getTasksTC} from "../../../state/tasks-reducer";
import {Task} from "./task/Task";
import {TaskStatuses, TaskType} from "../../../api/task-api";
import {FilterValues} from "../../../state/todolists-reducer";
import {RequestStatusType} from "../../../state/app-reducer";


type Props = {
    id: string;
    title: string;
    tasks: TaskType[];
    filter: FilterValues;
    setFilter: (todolistId: string, value: FilterValues) => void;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (todolistId: string, newTitle: string) => void;
    entityStatus: RequestStatusType;
};

export const Todolist = memo(({
                                  title,
                                  id,
                                  tasks,
                                  setFilter,
                                  filter,
                                  removeTodolist,
                                  changeTodolistTitle,
                                  entityStatus
                              }: Props) => {

    const dispatch = useAppDispatch();
    const isDisable = entityStatus === 'loading'

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, []);

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
        dispatch(addTaskTC(title, id))
    }, [id]);

    const changeTodolistTitleHandle = useCallback((newTitle: string) => {
        changeTodolistTitle(id, newTitle);
    }, [id, changeTodolistTitle]);

    if (filter === 'active')
        tasks = tasks.filter(task => task.status !== TaskStatuses.Completed);
    if (filter === 'completed')
        tasks = tasks.filter(task => task.status === TaskStatuses.Completed);


    return <div>
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandle}/>
        </h3>

        <IconButton onClick={onRemoveTodolistClick} disabled={isDisable}>
            <Delete/>
        </IconButton>

        <AddItemForm addItem={addTaskHandle} disabled={isDisable}/>

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