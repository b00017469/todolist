import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: Props) => {
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
            <input value={taskTitle} onChange={changeTitle}
                   onKeyPress={onKeyPressHandle}
                   className={errorMessage ? 'error' : ''}/>
            <button onClick={addTaskHandle}>+</button>
            {errorMessage && <div className={'error-message'}>{errorMessage}</div>}
        </div>
    );
};