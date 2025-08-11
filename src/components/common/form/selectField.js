import React from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Tooltip
} from '@mui/material';
import {InfinizeIcon, InfinizeTooltip} from '@/components/common';
import {visuallyHidden} from '@mui/utils';

export function SelectField({
    name,
    label,
    options = [],
    value,
    onChange,
    helperText,
    placeholder = 'Select',
    isDisabled
}) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>
            <Select
                id={name}
                name={name}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                displayEmpty
                disabled={isDisabled}
                renderValue={selected => {
                    if (!selected) {
                        return placeholder;
                    }
                    const selectedOption = options.find(
                        option => option.value === selected
                    );
                    const labelToDisplay = selectedOption
                        ? selectedOption.label
                        : selected;

                    return (
                        <InfinizeTooltip
                            title={labelToDisplay}
                            placement="top"
                            arrow
                        >
                            <span>{labelToDisplay}</span>
                        </InfinizeTooltip>
                    );
                }}
                sx={{
                    minWidth: 0,
                    '& .MuiSelect-select': {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        paddingRight: '32px'
                    },
                    '&.Mui-disabled .MuiSelect-select': {
                        WebkitTextFillColor: '#D8E6EC !important'
                    },
                    '& .MuiSelect-icon': {
                        display: value ? 'none' : 'block'
                    }
                }}
                inputProps={{
                    'aria-labelledby': `${name}-label`,
                    id: name
                }}
                endAdornment={
                    value && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => onChange('')}
                                edge="end"
                                size="small"
                            >
                                <InfinizeIcon
                                    icon="ic:round-clear"
                                    width={20}
                                    hight={20}
                                />
                            </IconButton>
                        </InputAdornment>
                    )
                }
            >
                {options.length > 0 ? (
                    options.map(({label, value}, index) => (
                        <MenuItem key={`${name}_option_${index}`} value={value}>
                            {label}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No options available</MenuItem>
                )}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
