'use client';
import React from 'react';
import {
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Stack
} from '@mui/material';
import {DATA_TYPE} from '@/config/constants';

export function RadioGroupField({
    name,
    label,
    options,
    value,
    onChange,
    direction = 'row',
    radioProps = {},
    labelProps = {}
}) {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" sx={{display: 'none'}}>
                {label}
            </FormLabel>
            <RadioGroup
                row
                name={name}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
            >
                <Stack
                    direction={direction}
                    gap={direction === 'column' ? 0 : 2}
                    flexWrap="wrap"
                >
                    {options.map((option, index) => {
                        // Handle both string and object formats
                        const isString = typeof option === DATA_TYPE.STRING;

                        const optionObj = isString
                            ? {value: option, label: option}
                            : option;

                        return (
                            <FormControlLabel
                                key={`${option}_${index}`} // Ensure unique key
                                control={
                                    <Radio
                                        id={`${name}_radio_${index}`}
                                        value={optionObj.value}
                                        {...radioProps}
                                    />
                                }
                                label={optionObj.label}
                                {...labelProps}
                            />
                        );
                    })}
                </Stack>
            </RadioGroup>
        </FormControl>
    );
}
