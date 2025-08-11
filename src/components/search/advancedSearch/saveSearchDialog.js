import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    IconButton
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import classes from './advancedSearch.module.css';

export default function SaveSearchDialog({open, onClose, onSave}) {
    const [searchName, setSearchName] = useState();

    const handleSave = () => {
        onSave(searchName);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                Save Search
                <IconButton onClick={onClose} aria-label="close">
                    <InfinizeIcon icon={'mingcute:close-fill'} />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Typography>
                    Enter a name for your search so you can reuse these filters
                    in the future.
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Enter"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={searchName || ''}
                    onChange={e => setSearchName(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    size="large"
                    className={classes.infinize__advancedSearch__button}
                    disabled={!searchName?.trim()}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
