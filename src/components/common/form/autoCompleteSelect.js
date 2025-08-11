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
    minFilterLength = 0,
    getOptionLabel,
    isOptionEqualToValue,
    customRenderOption
}) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>
            <Autocomplete
                options={options}
                value={value || null}
                onChange={(event, newValue) => onChange(newValue)}
                getOptionLabel={getOptionLabel}
                filterOptions={(opts, state) => {
                    const input = state.inputValue.trim().toLowerCase();
                    if (input.length < minFilterLength) {
                        return opts; // show all if input too short
                    }
                    return opts.filter(opt =>
                        getOptionLabel(opt)?.toLowerCase()?.includes(input)
                    );
                }}
                renderOption={
                    customRenderOption ??
                    ((props, option) => {
                        const {key, ...rest} = props;
                        return (
                            <ListItem key={key} {...rest} dense>
                                <ListItemText
                                    primary={getOptionLabel(option)}
                                />
                            </ListItem>
                        );
                    })
                }
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
                isOptionEqualToValue={isOptionEqualToValue}
                disableClearable={!value}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
