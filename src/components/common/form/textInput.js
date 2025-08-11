import React from 'react';
import {TextField} from '@mui/material';

export function TextInput({name, label, value, onChange, helperText}) {
    return (
        <TextField
            type="text"
            name={name}
            id={name}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="Enter"
            aria-labelledby={`${name}-hidden-label`}
            slots={{label: 'label'}}
            slotProps={{
                label: {shrink: true},
                input: {'aria-label': label}
            }}
            helperText={helperText}
        />
    );
}
