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
    // Get human-readable label
    const getLabel = option => {
        if (!option) return '';
        if (option.label) return option.label;
        if (option.subject && option.courseNumber && option.courseTitle) {
            return `${option.subject} - ${option.courseNumber} ${option.courseTitle}`;
        }
        if (option.subject && option.courseNumber) {
            return `${option.subject} - ${option.courseNumber}`;
        }
        return String(option);
    };

    // Equality check for value selection
    const isSameOption = (option, val) => {
        if (!option || !val) return false;
        if (option.value && val.value) return option.value === val.value;
        if (option.subject && val.subject) {
            return (
                option.subject === val.subject &&
                option.courseNumber === val.courseNumber
            );
        }
        return false;
    };

    // Create unique key for rendering
    const getUniqueKey = (option, index) => {
        return (
            option.value ||
            `${option.subject || ''}-${option.courseNumber || ''}-${index}`
        );
    };

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>
            <Autocomplete
                options={options}
                value={options.find(opt => isSameOption(opt, value)) || null}
                onChange={(event, newValue) => {
                    onChange(newValue || null);
                }}
                getOptionLabel={getLabel}
                filterOptions={(opts, state) => {
                    const input = state.inputValue.trim().toLowerCase();
                    if (input.length < minFilterLength) {
                        return opts;
                    }
                    return opts.filter(opt =>
                        getLabel(opt).toLowerCase().includes(input)
                    );
                }}
                renderOption={(props, option, {index}) => {
                    const {key, ...rest} = props;
                    return (
                        <ListItem
                            key={getUniqueKey(option, index)}
                            {...rest}
                            dense
                        >
                            <ListItemText primary={getLabel(option)} />
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
                isOptionEqualToValue={isSameOption}
                disableClearable={value === undefined || value === null}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
