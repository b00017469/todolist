import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

type Props = {
    value: string;
    onChange: (newValue: string) => void;
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [text, setText] = useState(value)

    const activeEditeMode = () => {
        setEditMode(true);
        setText(value);
    };

    const activeViewMode = () => {
        setEditMode(false);
        onChange(text);
    }

    const changeText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
    }


    return editMode
        ?
        <TextField variant='outlined' value={text} onChange={changeText}
                   onBlur={activeViewMode} autoFocus/>
        :
        <span onDoubleClick={activeEditeMode}>
            {text}
        </span>;
};
