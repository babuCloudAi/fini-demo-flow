'use client';
import {useState} from 'react';
import {Menu, MenuItem, ListItemIcon, IconButton} from '@mui/material';
import {InfinizeIcon} from '@/components/common';

export default function NotesMenu({onEdit, onDeleted}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = e => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = e => {
        setAnchorEl(null);
    };

    const handleEdit = e => {
        e.stopPropagation();
        handleMenuClose();
        onEdit();
    };

    const handleDelete = e => {
        e.stopPropagation();
        handleMenuClose();
        onDeleted();
    };

    return (
        <>
            <IconButton size="small" onClick={handleMenuOpen}>
                <InfinizeIcon
                    icon="ic:round-more-vert"
                    style={{color: '#A5A5A5'}}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                className="menu"
            >
                <MenuItem onClick={handleEdit} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="mynaui:edit-one-solid"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Edit
                </MenuItem>

                <MenuItem onClick={handleDelete} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="fluent:delete-24-filled"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}
