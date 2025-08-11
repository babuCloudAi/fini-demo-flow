'use client';
import {useState} from 'react';
import {Menu, MenuItem, ListItemIcon, Button} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import {ALERT_TYPE} from '@/config/constants';

export default function AlertMenu({
    onGenerateNudge,
    onSendKudos,
    alertType,
    isBulkAction
}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = event => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDismiss = event => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleAcknowledge = event => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleNudgeSubmit = event => {
        event.stopPropagation();
        setAnchorEl(null);
        onGenerateNudge();
    };

    const handleKudosSubmit = event => {
        event.stopPropagation();
        setAnchorEl(null);
        onSendKudos();
    };

    const handleAction = event => {
        if (alertType === ALERT_TYPE.ALERT) {
            handleNudgeSubmit(event);
        } else {
            handleKudosSubmit(event);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleMenuOpen}
                sx={{
                    textTransform: 'none',
                    alignSelf: 'flex-end',
                    padding: '8px 16px'
                }}
            >
                {isBulkAction ? 'Bulk Actions' : 'Actions'}
                <InfinizeIcon icon="tabler:chevron-right" width="18px" />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                className={'menu'}
            >
                <MenuItem onClick={handleAction} className={'menuItem'}>
                    <ListItemIcon>
                        <InfinizeIcon
                            icon={
                                alertType === ALERT_TYPE.ALERT
                                    ? 'hugeicons:touchpad-02'
                                    : 'pepicons-pop:hands-clapping'
                            }
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    {alertType === ALERT_TYPE.ALERT
                        ? 'Generate Nudge'
                        : 'Send Kudos'}
                </MenuItem>

                <MenuItem onClick={handleDismiss} className={'menuItem'}>
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="fluent:dismiss-circle-12-regular"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Dismiss
                </MenuItem>

                <MenuItem onClick={handleAcknowledge} className={'menuItem'}>
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="iconamoon:like"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Acknowledge
                </MenuItem>
            </Menu>
        </>
    );
}
