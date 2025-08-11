import React from 'react';
import {Button, Typography} from '@mui/material';
import classes from './formFields.module.css';
export function AddButton({onAdd, name, disabled = true}) {
    return (
        <Button
            variant="outlined"
            onClick={onAdd}
            disabled={!disabled}
            className={classes.infinize__addButton}
        >
            <Typography fontSize={20} pr={1} aria-hidden={true}>
                +
            </Typography>

            <Typography>{name}</Typography>
        </Button>
    );
}
