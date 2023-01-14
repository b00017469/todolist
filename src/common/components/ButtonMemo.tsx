import React, {memo} from 'react';
import Button from "@mui/material/Button";

type Props = {
    title: string;
    onClick: () => void;
    variant: 'text' | 'outlined' | 'contained';
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export const ButtonMemo = memo(({title, color, variant, onClick}: Props) => {
    return (
        <Button onClick={onClick} variant={variant} color={color}>
            {title}
        </Button>
    );
});
