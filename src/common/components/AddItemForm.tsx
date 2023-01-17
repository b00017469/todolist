import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/icons-material/AddBox";

type Props = {
    addItem: (title: string) => void;
    disabled?: boolean;
}

export const AddItemForm = memo(({addItem, disabled}: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    };

    const onKeyPressHandle = (event: KeyboardEvent<HTMLInputElement>) => {
        if (errorMessage !== null) setErrorMessage(null);
        if (event.key === 'Enter') addItemHandle();
    };

    const addItemHandle = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim());
            setTaskTitle('');
        } else {
            setErrorMessage('Title is required');
        }
    };

    return (
        <div>
            <TextField variant='outlined'
                       value={taskTitle}
                       onChange={changeTitle}
                       onKeyPress={onKeyPressHandle}
                       error={!!errorMessage}
                       label='Title'
                       helperText={errorMessage}
                       disabled={disabled}/>
            <IconButton color='primary' onClick={addItemHandle} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    );
});