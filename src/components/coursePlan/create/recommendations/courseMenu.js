'use client';
import {useState, useRef} from 'react';
import {Menu, MenuItem, ListItemIcon, IconButton} from '@mui/material';
import {InfinizeIcon} from '../../../common';

export default function CourseMenu({
    course,
    term,
    onMove,
    onDelete,
    availableMoveOptions
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [moveMenuAnchor, setMoveMenuAnchor] = useState(null);
    const moveToRef = useRef(null);

    const closeAllMenus = e => {
        if (e?.stopPropagation) e.stopPropagation();
        setAnchorEl(null);
        setMoveMenuAnchor(null);
    };

    const handleMenuOpen = event => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = event => {
        event.stopPropagation();
        closeAllMenus();
        onDelete();
    };

    const handleMove = (event, targetTerm) => {
        event.stopPropagation();
        closeAllMenus();
        onMove(course, term, targetTerm);
    };

    const handleMoveMenu = event => {
        event.stopPropagation();
        setMoveMenuAnchor(moveToRef.current);
    };

    return (
        <>
            <IconButton
                onClick={handleMenuOpen}
                role="button"
                sx={{
                    padding: 0,
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <InfinizeIcon
                    icon="mi:options-vertical"
                    className="menuIcon"
                    height="20px"
                />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeAllMenus}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                className="menu"
                sx={{
                    margin: '20px -8px'
                }}
            >
                <MenuItem
                    ref={moveToRef}
                    onMouseEnter={() => setMoveMenuAnchor(moveToRef.current)}
                    onMouseLeave={() => setMoveMenuAnchor(null)}
                    onClick={handleMoveMenu}
                    className="menuItem"
                >
                    <ListItemIcon>
                        <InfinizeIcon icon="material-symbols:move-up-rounded" />
                    </ListItemIcon>
                    Move to
                </MenuItem>

                <MenuItem onClick={handleDelete} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon icon="fluent:delete-24-filled" />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>

            <Menu
                anchorEl={moveMenuAnchor}
                open={Boolean(moveMenuAnchor)}
                onClose={e => {
                    e.stopPropagation();
                    setMoveMenuAnchor(null);
                }}
                anchorOrigin={{vertical: 'center', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                sx={{
                    pointerEvents: 'none',
                    '& .MuiPaper-root': {
                        pointerEvents: 'auto'
                    },
                    margin: '8px -20px'
                }}
                className="menu"
                slotProps={{
                    list: {
                        onMouseEnter: () =>
                            setMoveMenuAnchor(moveToRef.current),
                        onMouseLeave: () => setMoveMenuAnchor(null)
                    }
                }}
            >
                {availableMoveOptions.length === 0 ? (
                    <MenuItem key="no_options" disabled className="menuItem">
                        Course not offered in other terms
                    </MenuItem>
                ) : (
                    availableMoveOptions.map((termOption, index) => (
                        <MenuItem
                            key={index}
                            onClick={event =>
                                handleMove(event, termOption.termCode)
                            }
                            className="menuItem"
                        >
                            {termOption.label}
                        </MenuItem>
                    ))
                )}
            </Menu>
        </>
    );
}
