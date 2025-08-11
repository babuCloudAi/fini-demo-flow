import React from 'react';
import {
    Checkbox,
    FormControlLabel,
    FormControl,
    Box,
    InputLabel
} from '@mui/material';

export function CheckboxGroup({name, label, options, value = [], onChange}) {
    const handleCheckboxChange = (option, checked) => {
        const updatedValue = checked
            ? [...value, option] // Add the selected option
            : value?.filter(item => item !== option); // Remove the unselected option
        onChange(updatedValue); // Update parent state
    };

    return (
        <FormControl component="fieldset" fullWidth>
            <InputLabel id={`${name}-label`} sx={{display: 'none'}}>
                {label}
            </InputLabel>
            <Box display="flex" flexWrap="wrap">
                {options.map(option => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                name={option}
                                checked={value?.includes(option)} // Check if this option is selected
                                onChange={e =>
                                    handleCheckboxChange(
                                        option,
                                        e.target.checked
                                    )
                                } // Handle checkbox state change
                            />
                        }
                        label={option}
                    />
                ))}
            </Box>
        </FormControl>
    );
}
