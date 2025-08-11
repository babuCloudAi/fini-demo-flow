import React from 'react';
import {
    Autocomplete,
    Checkbox,
    FormControl,
    TextField,
    Box,
    FormHelperText,
    ListItem,
    ListItemIcon,
    ListItemText,
    InputLabel
} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {CustomChip} from './customChip';

export function AutoCompleteMultiSelect({
    name,
    label,
    options,
    value = [],
    onChange,
    helperText,
    minFilterLength
}) {
    const handleDelete = itemToDelete => {
        onChange(value.filter(item => item !== itemToDelete));
    };

    return (
        <FormControl fullWidth>
            {/* Hidden accessible label */}
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>

            <Autocomplete
                multiple
                options={options}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
                disableCloseOnSelect
                getOptionLabel={option => option}
                aria-labelledby={`${name}-label`}
                slotProps={{
                    listbox: {
                        style: {maxHeight: 200, overflowY: 'auto'}
                    }
                }}
                filterOptions={(opts, state) => {
                    const input = state.inputValue.trim().toLowerCase();
                    if (input.length < minFilterLength) return opts;
                    return opts.filter(opt =>
                        opt.toLowerCase().includes(input)
                    );
                }}
                renderOption={(props, option, {selected}) => {
                    const {key, ...rest} = props;
                    return (
                        <ListItem key={option} {...rest} dense>
                            <ListItemIcon sx={{minWidth: 32}}>
                                <Checkbox
                                    edge="start"
                                    checked={selected}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </ListItem>
                    );
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select"
                        fullWidth
                        label="" // No visible label
                    />
                )}
                renderValue={selected => (
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {selected.map((item, index) => (
                            <CustomChip
                                key={item}
                                label={item}
                                onAction={() => handleDelete(item)}
                            />
                        ))}
                    </Box>
                )}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
