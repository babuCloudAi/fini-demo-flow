'use client';
import {useState} from 'react';
import {Menu, MenuItem, ListItemIcon, IconButton} from '@mui/material';
import {InfinizeIcon} from '../../common';

export default function CoursePlanMenu({onDelete, onEdit}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleMenuClose();
        onEdit();
    };

    const handleDelete = () => {
        handleMenuClose();
        onDelete();
    };

    return (
        <>
            <IconButton
                onClick={handleMenuOpen}
                sx={{alignSelf: {ms: 'center', lg: 'flex-end'}}}
            >
                <InfinizeIcon icon="mi:options-vertical" height="20px" />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                className="menu"
            >
                <MenuItem onClick={handleEdit} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon icon="mage:edit-fill" />
                    </ListItemIcon>
                    Edit
                </MenuItem>

                <MenuItem onClick={handleDelete} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon icon="fluent:delete-24-filled" />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}
