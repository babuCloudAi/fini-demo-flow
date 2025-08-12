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
    options = [],
    value = [],
    onChange,
    helperText,
    minFilterLength = 0
}) {
    // Remove an item by filtering out its value
    const handleDelete = itemToDelete => {
        onChange(value.filter(val => val !== itemToDelete));
    };

    // Get selected full option objects from selected values
    const selectedOptions = options.filter(opt => value.includes(opt.value));

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>

            <Autocomplete
                multiple
                options={options}
                value={selectedOptions}
                onChange={(event, newSelectedOptions) => {
                    onChange(newSelectedOptions.map(opt => opt.value));
                }}
                disableCloseOnSelect
                getOptionLabel={option => option.label}
                isOptionEqualToValue={(option, val) =>
                    option.value === val.value
                }
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
                        opt.label.toLowerCase().includes(input)
                    );
                }}
                renderOption={(props, option, {selected}) => {
                    const {key, ...rest} = props;
                    return (
                        <ListItem key={option.value} {...rest} dense>
                            <ListItemIcon sx={{minWidth: 32}}>
                                <Checkbox
                                    edge="start"
                                    checked={selected}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={option.label} />
                        </ListItem>
                    );
                }}
                renderTags={(selected, getTagProps) =>
                    selected.map((option, index) => {
                        const key = option.value || index;
                        const {key: _ignoredKey} = getTagProps({
                            index
                        });
                        return (
                            <CustomChip
                                key={key}
                                label={option.label}
                                onAction={() => handleDelete(option.value)}
                            />
                        );
                    })
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select"
                        fullWidth
                        label=""
                    />
                )}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
