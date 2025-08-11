'use client';

import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import {useState} from 'react';
import {InfinizeIcon} from '../common';
import classes from './header.module.css';

export default function MenuButton(props) {
    const [anchor, setAnchor] = useState(null);

    const handleClick = e => {
        setAnchor(e.currentTarget);
    };

    const handleLogout = e => {
        setAnchor(null);
    };

    const handleProfile = e => {
        setAnchor(null);
    };

    const handleSettings = e => {
        setAnchor(null);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    return (
        <Box>
            <IconButton
                id="menu-button"
                aria-controls={anchor ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchor ? 'true' : undefined}
                onClick={handleClick}
            >
                <InfinizeIcon
                    icon="iconamoon:arrow-down-2-duotone"
                    className={classes.infinize__header}
                />
            </IconButton>
            <Menu
                id="account-menu"
                anchorEl={anchor}
                open={!!anchor}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'account-menu'
                }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '16px',
                        boxShadow:
                            '0px 0px 25px 0px rgba(0, 0, 0, 0.05) !important',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        top: '60px !important'
                    }
                }}
                className={classes.infinize__menu}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <Box display="flex" alignItems="center" m={2}>
                    <Avatar
                        alt={`Profile picture of ${props.user.name}`}
                        src={props.user.photo}
                    />
                    <Box gap={2} mx={2}>
                        <Typography fontSize={16} fontWeight={500}>
                            {props.user.name}
                        </Typography>
                        <Typography className={classes.infinize__menu_email}>
                            {props.user.email}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <MenuItem onClick={handleProfile}>
                    <Box display="flex" p={1} gap={2}>
                        <InfinizeIcon
                            icon="mingcute:user-3-fill"
                            width={24}
                            height={24}
                        />
                        <Typography>Profile</Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleSettings}>
                    <Box display="flex" p={1} gap={2}>
                        <InfinizeIcon
                            icon="material-symbols:settings-rounded"
                            width={24}
                            height={24}
                        />
                        <Typography>Account Settings</Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Box display="flex" p={1} gap={2}>
                        <InfinizeIcon
                            icon="majesticons:logout-half-circle"
                            width={24}
                            height={24}
                        />
                        <Typography>Logout</Typography>
                    </Box>
                </MenuItem>
            </Menu>
        </Box>
    );
}
