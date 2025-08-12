import React from 'react';
import {
    Autocomplete,
    FormControl,
    TextField,
    InputLabel,
    FormHelperText,
    ListItem,
    ListItemText
} from '@mui/material';
import {visuallyHidden} from '@mui/utils';

export function AutoCompleteSelect({
    name,
    label,
    options = [],
    value,
    onChange,
    helperText,
    minFilterLength = 0
}) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>
            <Autocomplete
                options={options}
                value={options.find(opt => opt.value === value) || null}
                onChange={(event, newValue) => {
                    onChange(newValue ? newValue.value : null);
                }}
                getOptionLabel={option => option.label}
                filterOptions={(opts, state) => {
                    const input = state.inputValue.trim().toLowerCase();
                    if (input.length < minFilterLength) {
                        return opts;
                    }
                    return opts.filter(opt =>
                        opt.label.toLowerCase().includes(input)
                    );
                }}
                renderOption={(props, option) => {
                    const {key, ...rest} = props;
                    return (
                        <ListItem key={option.value} {...rest} dense>
                            <ListItemText primary={option.label} />
                        </ListItem>
                    );
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label=""
                        placeholder="Select"
                        fullWidth
                        variant="outlined"
                        aria-labelledby={`${name}-label`}
                    />
                )}
                isOptionEqualToValue={(option, val) =>
                    option.value === val.value
                }
                disableClearable={value === undefined || value === null}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
