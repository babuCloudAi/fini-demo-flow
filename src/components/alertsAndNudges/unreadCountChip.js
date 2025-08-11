import React from 'react';
import {Chip} from '@mui/material';
import {countUnreadAlerts} from './utils';
import classes from './alertsAndNudges.module.css';

export default function UnreadCountChip({alerts = []}) {
    const unreadCount = countUnreadAlerts(alerts);

    return (
        unreadCount > 0 && (
            <Chip
                label={`${unreadCount} Unread`}
                size="small"
                className={classes.infinize__unreadCountChip}
                sx={{
                    color: 'primary.main'
                }}
            />
        )
    );
}
