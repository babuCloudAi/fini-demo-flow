import React from 'react';
import {Chip} from '@mui/material';

export function CustomChip({
    label,
    onAction,
    size = 'small',
    actionIcon,
    ...props
}) {
    return (
        <Chip
            className="infinize__chip"
            label={label}
            onDelete={onAction}
            size={size}
            variant="outlined"
            deleteIcon={actionIcon}
            onMouseDown={e => e.stopPropagation()}
            {...props}
        />
    );
}
