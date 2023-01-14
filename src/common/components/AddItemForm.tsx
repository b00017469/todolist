import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/icons-material/AddBox";

type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = memo(({addItem}: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
        setErrorMessage(null);
    };

    const onKeyPressHandle = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandle();
    };

    const addTaskHandle = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim());
            setTaskTitle('');
        } else {
            setErrorMessage('Title is required');
        }
    };

    return (
        <div>
            <TextField variant='outlined' value={taskTitle} onChange={changeTitle}
                       onKeyPress={onKeyPressHandle}
                       error={!!errorMessage}
                       label='Title'
                       helperText={errorMessage}/>
            <IconButton color='primary' onClick={addTaskHandle}>
                <AddBox/>
            </IconButton>
        </div>
    );
});