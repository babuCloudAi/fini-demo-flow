import React from 'react';
import {
    Select,
    MenuItem,
    Checkbox,
    FormControl,
    InputLabel,
    Box,
    Typography,
    FormHelperText
} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {CustomChip} from './customChip';

export function MultiSelectField({
    name,
    label,
    options = [],
    value = [],
    onChange,
    helperText
}) {
    const handleDelete = itemToDelete => {
        onChange(value.filter(item => item !== itemToDelete));
    };

    const selectedOptions = options.filter(opt => value.includes(opt.value));

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>
            <Select
                labelId={`${name}-label`}
                multiple
                name={name}
                value={value || []}
                onChange={e => onChange(e.target.value)}
                displayEmpty
                renderValue={selected =>
                    selected.length === 0 ? (
                        <Typography color="textSecondary">Select</Typography>
                    ) : (
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {selectedOptions.map(({label, value}) => (
                                <CustomChip
                                    key={value}
                                    label={label}
                                    onDelete={() => handleDelete(value)}
                                />
                            ))}
                        </Box>
                    )
                }
                inputProps={{'aria-labelledby': `${name}-label`}}
                MenuProps={{
                    disablePortal: false,
                    anchorOrigin: {vertical: 'bottom', horizontal: 'left'},
                    transformOrigin: {vertical: 'top', horizontal: 'left'},
                    PaperProps: {style: {maxHeight: 200, overflowY: 'auto'}}
                }}
            >
                {options.map(({label, value: optionValue}, index) => (
                    <MenuItem
                        key={`${name}_${index}`}
                        value={optionValue}
                        sx={{
                            backgroundColor: value.includes(optionValue)
                                ? 'secondary.main'
                                : 'transparent'
                        }}
                    >
                        <Checkbox checked={value.includes(optionValue)} />
                        {label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
