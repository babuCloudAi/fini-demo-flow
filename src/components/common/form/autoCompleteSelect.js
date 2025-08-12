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
    const safeGetOptionLabel = option => {
        if (!option) return '';
        if (typeof option === 'string') return option;
        if (typeof getOptionLabel === 'function') {
            const label = getOptionLabel(option);
            return label != null ? String(label) : '';
        }
        // Your case: label/value pairs
        if (option.label) return String(option.label);
        if (option.value) return String(option.value);
        return String(option);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>
            <Autocomplete
                options={options}
                value={value || null}
                onChange={(event, newValue) => onChange(newValue)}
                getOptionLabel={safeGetOptionLabel}
                filterOptions={(opts, state) => {
                    const input = state.inputValue.trim().toLowerCase();
                    if (input.length < minFilterLength) {
                        return opts; // show all if input too short
                    }
                    return opts.filter(opt => {
                        const label = safeGetOptionLabel(opt);
                        return label.toLowerCase().includes(input);
                    });
                }}
                renderOption={
                    customRenderOption ??
                    ((props, option) => {
                        const {key, ...rest} = props;
                        return (
                            <ListItem key={key} {...rest} dense>
                                <ListItemText
                                    primary={safeGetOptionLabel(option)}
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
