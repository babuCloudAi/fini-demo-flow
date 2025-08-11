'use client';
import {useState} from 'react';
import {Menu, MenuItem, ListItemIcon, IconButton} from '@mui/material';
import {InfinizeIcon} from '../../../common';

export default function CoursePlanMenu({
    onExpandAll,
    onCollapseAll,
    onAddTerm,
    onReset,
    onRestart,
    isEditMode = false
}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleExpandAll = () => {
        handleMenuClose(); // Close the menu after action
        onExpandAll();
    };

    const handleCollapseAll = () => {
        handleMenuClose(); // Close the menu after action
        onCollapseAll();
    };

    return (
        <>
            <IconButton onClick={handleMenuOpen}>
                <InfinizeIcon
                    icon="mi:options-vertical"
                    className="menuItemIcon"
                />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                className="menu"
                sx={{
                    '& .MuiPaper-root': {
                        marginLeft: 0,
                        marginTop: 0
                    }
                }}
            >
                <MenuItem onClick={handleExpandAll} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="mingcute:list-expansion-fill"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Expand All
                </MenuItem>
                <MenuItem onClick={handleCollapseAll} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="mingcute:list-collapse-fill"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Collapse All
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        onAddTerm();
                    }}
                    className="menuItem"
                >
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="streamline-quality-education"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Add Term
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        onReset();
                    }}
                    className="menuItem"
                >
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="ic:round-reset-tv"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Reset
                </MenuItem>
                {!isEditMode && (
                    <MenuItem
                        onClick={() => {
                            handleMenuClose();
                            onRestart();
                        }}
                        className="menuItem"
                    >
                        <ListItemIcon>
                            <InfinizeIcon
                                icon="icon-park-outline:reload"
                                className="menuItemIcon"
                            />
                        </ListItemIcon>
                        Restart
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}
