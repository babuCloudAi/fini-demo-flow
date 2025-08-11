import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './common.module.css';

export function Loader({isOpen}) {
    return (
        <Dialog open={isOpen}>
            <DialogContent className={classes.infinize__LoaderDialogContent}>
                <CircularProgress size={50} />
            </DialogContent>
        </Dialog>
    );
}
