'use client';
import {useState} from 'react';
import {Menu, MenuItem, IconButton, Typography} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import classes from './viewAllAlerts.module.css';
import {getFilterLabel} from '../utils';
import {ALERT_STATUS, ALERT_TYPE} from '@/config/constants';

export default function Filter({onFilterChange, selectedFilter, alertType}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = statusKey => {
        handleMenuClose();
        onFilterChange(statusKey);
    };

    return (
        <>
            <IconButton
                edge="end"
                size="small"
                className={classes.infinize__alertFilter}
                onClick={handleMenuOpen}
            >
                <InfinizeIcon
                    icon="majesticons:filter-line"
                    width={20}
                    height={20}
                />
                <Typography ml={0.5}>Filter</Typography>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                slotProps={{
                    paper: {
                        className: classes.infinize__filterMenu
                    }
                }}
            >
                {
                    // Loop through each status in the filterStatuses array
                    Object.values(ALERT_STATUS).map(status => {
                        // Determine whether this status should be hidden based on the current alertType
                        const isHidden =
                            (status === ALERT_STATUS.NUDGED &&
                                alertType !== ALERT_TYPE.ALERT) || // Hide "Nudged" unless alertType is "Alert"
                            (status === ALERT_STATUS.KUDOS_GIVEN &&
                                alertType !== ALERT_TYPE.ACCOMPLISHMENT); // Hide "Kudos" unless alertType is "Accomplishment"

                        return (
                            !isHidden && (
                                <MenuItem
                                    key={status}
                                    onClick={() => handleFilterChange(status)}
                                    selected={selectedFilter === status}
                                    className="menuItem"
                                >
                                    {getFilterLabel(status)}
                                </MenuItem>
                            )
                        );
                    })
                }
            </Menu>
        </>
    );
}
