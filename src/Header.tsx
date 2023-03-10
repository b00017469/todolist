import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppSelector} from "./common/hooks/useAppSelector";
import LinearProgress from "@mui/material/LinearProgress";

export const Header = () => {

    const status = useAppSelector((state) => state.app.status);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Todolist
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            {status === 'loading' && <LinearProgress color="success"/>}
        </AppBar>
    );
};